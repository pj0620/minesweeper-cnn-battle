import { FlaskPredictionApiAdapter } from "@/adapter/flask_prediction_api_adapter"
import { PredictionApiAdapter } from "@/adapter/prediction_api_adapter"
import { CELL_BATCH_SIZE, GUESS_SIZE } from "@/constants/ai_solver"
import { NUMBER_ROWS_COLUMNS } from "@/constants/game_board"
import { CellPredictionRequest } from "@/model/cell_prediction_request"
import { CellPredictionResponse } from "@/model/cell_prediction_response"
import { bytesToBase64, generateNewBoard } from "@/util/board_utils"

export class AIPlayerService {
  private guessableMask: number[][] = generateNewBoard(0)
  private usableValuesMask: number[][] = generateNewBoard(0)
  private locationsToPredict: number[][] = []
  private known: number[][] = generateNewBoard(0)

  private predictionApiAdapter: PredictionApiAdapter;

  constructor () {
    this.loadRawBoardSection = this.loadRawBoardSection.bind(this)
    this.buildCellPredictionRequest = this.buildCellPredictionRequest.bind(this)

    this.predictionApiAdapter = new FlaskPredictionApiAdapter();
  }

  public computeVectorRepresentation(known: number[][], values: number[][], isLoading: number[][]) {
    const resGuessable = this.findBoundary(known)
    this.guessableMask = resGuessable.mask
    this.locationsToPredict = resGuessable.locations

    for (let i=0; i < NUMBER_ROWS_COLUMNS; i++){
      for (let j=0; j < NUMBER_ROWS_COLUMNS; j++){
        isLoading[i][j] = this.guessableMask[i][j]
      }
    }
    

    const resValues = this.findBoundary(known, (x) => 1 - x, values)
    this.usableValuesMask = resValues.mask

    this.known = [...known]
  }

  public getGuessableMask(): number[][] {
    return this.guessableMask
  }

  public hasMoreLocationsToPredict() {
    return this.locationsToPredict.length > 0
  }

  public async loadBatchOfPoints(): Promise<CellPredictionResponse[]> {
    console.log('getting predictions for points')

    if (this.locationsToPredict.length === 0) {
      return []
    }

    const batch: number[][] = this.locationsToPredict.splice(0, CELL_BATCH_SIZE)

    console.log(`loading batch of ${batch.length} locations: ${batch}`)

    const cellPredictionInputs: CellPredictionRequest[] = batch.map(this.buildCellPredictionRequest)
    const predictions = await this.predictionApiAdapter.predictCells(cellPredictionInputs)
      .catch(err => {
        console.log(`error while getting predictions`, err)
        return []
      })

    console.log(`predictions:`, predictions)

    return predictions
  }

  private buildCellPredictionRequest(location: number[]): CellPredictionRequest {
    return {
      location,
      encodedBoardSection: this.loadRawBoardSection(location),
      guessSize: GUESS_SIZE
    }
  }

  private loadRawBoardSection(location: number[]): string {
    const [x, y] = location
    const padding = (GUESS_SIZE - 1) / 2
    
    const bytes = []
    let outOfBoard = 1
    let isKnown = 1
    let val = 0

    let outOfBoardDisp = generateNewBoard(0)
    let isKnownDisp = generateNewBoard(0)
    let valDisp = generateNewBoard(0)

    let realIdx = 0
    for (let i=x - padding; i <= x + padding; i++) {
      for (let j=y - padding; j <= y + padding; j++) {
        // if outside of board
        if (i < 0 || i >= NUMBER_ROWS_COLUMNS || j < 0 || j >= NUMBER_ROWS_COLUMNS) {
          outOfBoard = 1
          isKnown = 0
          val = 0
        }
        // if inside board
        else {
          outOfBoard = 0
          isKnown = this.known[i][j]
          val = this.usableValuesMask[i][j]
        }

        const info_byte = outOfBoard << 5 | isKnown << 4 | val
        bytes.push(info_byte)

        let ir = Math.floor(realIdx / GUESS_SIZE)
        let jr = realIdx % GUESS_SIZE

        outOfBoardDisp[ir][jr] = outOfBoard
        isKnownDisp[ir][jr] = isKnown
        valDisp[ir][jr] = val

        realIdx++
      }
    }

    console.log(`sending bytes: ${bytes}`)

    console.log('outOfBoardDisp')
    console.table(outOfBoardDisp)
    console.log('isKnownDisp')
    console.table(isKnownDisp)
    console.log('valDisp')
    console.table(valDisp)

    return bytesToBase64(bytes)
  }

  // assumes arr is a 2d array of 0s and 1s 
  //
  // * Compute the convolution of the given array with 3x3 guassian kernal
  // * then map any value greater than 0 to 1
  // * then subtracts original
  private findBoundary(arr: number[][], 
    dataTransform?: (x: number) => number,
    mask?: number[][]): {mask: number[][], locations: number[][]} 
  {
    // boundary mask
    const result = generateNewBoard(0)

    // list of points where boundry is non-zero
    const resultList = []

    // loop over board
    for (let i=0; i<arr.length; i++) {
      for (let j=0; j<arr[i].length; j++) {

        const val = dataTransform ? dataTransform(arr[i][j]) : arr[i][j]

        // dont consider expanding to find boundry if this element is zero
        if (val === 0) {
          continue
        }

        // expand around this element
        for (let x=Math.max(0, i-1); x<=Math.min(arr.length-1, i+1); x++) {
          for (let y=Math.max(0, j-1); y<=Math.min(arr[i].length-1, j+1); y++) {

            // get values at (x,y) considering dataTransform if provided
            const val_k = dataTransform ? dataTransform(arr[x][y]) : arr[x][y]

            // mask value at (x,y)
            const maskV = mask ? mask[x][y] : 1

            // if this point is 0 in original array, add to boundary
            if (val_k === 0) {
              if (result[x][y] !== maskV) {
                resultList.push([x, y])
              }
              result[x][y] = maskV
            }
          }
        }

      }
    }

    return { mask: result, locations: resultList }
  }
}

