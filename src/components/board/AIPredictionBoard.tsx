import { ExposedCell } from "@/components/cell/ExposedCell";
import { HiddenCell } from "@/components/cell/HiddenCell";
import { BOARD_SIZE, NUMBER_ROWS_COLUMNS, AI_HEADER_COLOR, AI_KNOWN_COLOR_CLASS, BOARD_UNIT, HEADER_HEIGHT_SCALE } from "@/constants/game_board";
import { LoadingCell } from "../cell/LoadingCell";

interface AIPredictionBoardProps {
  known: number[][]
  values: number[][]
  safeClickProbs: number[][]
  isLoading: number[][]
  guessableMask: number[][]
}

export function AIPredictionBoard({ known, values, safeClickProbs, isLoading, guessableMask } : AIPredictionBoardProps) {
  function getCell(index: number) {
    const i = Math.floor(index / NUMBER_ROWS_COLUMNS)
    const j = index % NUMBER_ROWS_COLUMNS

    const colorIdx = (Math.floor(index / NUMBER_ROWS_COLUMNS) + index) % 2

    if (isLoading[i][j] === 1) {
      return (<LoadingCell 
        key={index} 
        manualColor={"#000000"}
      />)
    }
    
    else if (known[i][j] === 0) {
      const prob = 1 - safeClickProbs[i][j]
      const dist = prob - 0.5

      let [red, green, blue] = [0, 0, 0]
      if (dist > 0) {
        red = (dist / 0.5) * 200
        red = Math.min(red, 255)
        red = Math.max(red, 0)
      } else {
        green = - (dist / 0.5) * 200
        green = Math.min(green, 255)
        green = Math.max(green, 0)
      }

      console.log(`final color: rgb(${red} ${green} ${blue})`)

      // const greyscale = Math.floor(255 * prob)

      return (<HiddenCell 
        key={index}
        manualColor={guessableMask[i][j] === 0 ? 'grey' : `rgb(${red} ${green} ${blue})`}
        handleClick={() => { } }
        handleFlag={() => { } }
        flagged={false}
        displayProb={1 - prob} 
        showQuestionMark={guessableMask[i][j] === 0}        
        showBomb={false}      
      />)
    }

    return (<ExposedCell 
      key={index}
      colorClass={AI_KNOWN_COLOR_CLASS[colorIdx]}
      // value={values[i][j]}
      value={0}
      handleClick={() => {}}
    />)    
  }

  return (
    <div 
      className="flex flex-wrap"
      style={{
        width: BOARD_SIZE + BOARD_UNIT,
        height: BOARD_SIZE + BOARD_UNIT
      }}>
        <div 
          className="text-4xl lg:text-4xl md:text-3xl sm:tet-3xl"
          style={{
            width: BOARD_SIZE + BOARD_UNIT,
            height: (BOARD_SIZE / NUMBER_ROWS_COLUMNS) * HEADER_HEIGHT_SCALE + BOARD_UNIT,
            backgroundColor: AI_HEADER_COLOR,
            display: 'grid',
            placeItems: 'center'
          }}>
            🤖AI🤖
        </div>
      {Array.from({ length: NUMBER_ROWS_COLUMNS * NUMBER_ROWS_COLUMNS }).map((_, index) => (
        getCell(index)
      ))}
    </div>
  );
}