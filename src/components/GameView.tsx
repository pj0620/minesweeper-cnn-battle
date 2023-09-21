"use client";

import { BOARD_SIZE, UNKNOWN_COLOR_CLASS_1, UNKNOWN_COLOR_CLASS_2, NUMBER_ROWS_COLUMNS, BOARD_UNIT, NUM_BOMBS } from "@/constants/game_board";
import { generateBombsValues, generateNewBoard } from "@/util/board_utils";
import { useEffect, useState } from "react";
import { GameBoard } from "./board/GameBoard";
import { GameStatus } from "@/model/game_state";
import { AIPredictionBoard } from "./board/AIPredictionBoard";
import { AIPlayerService } from "@/service/ai_player_service";
import { CellPredictionResponse } from "@/model/cell_prediction_response";
import { FinalScreen } from "./FinalScreen";

export function GameView() {
  const [bomb, setBomb] = useState(generateNewBoard(0))
  const [known, setKnown] = useState(generateNewBoard(0))
  const [values, setValues] = useState(generateNewBoard(0))
  const [flags, setFlags] = useState(generateNewBoard(0))

  const [safeClickProbs, setSafeClickProbs] = useState(generateNewBoard(0))
  const [isLoading, setIsLoading] = useState(generateNewBoard(0))

  const [gameStatus, setGameStatus] = useState(GameStatus.IN_PROGRESS)
  let [unknownCells, setUnknownCells] = useState(NUMBER_ROWS_COLUMNS * NUMBER_ROWS_COLUMNS)

  const aiPlayerService = new AIPlayerService()

  useEffect(() => {
    const { bomb, values } = generateBombsValues()
    setBomb(bomb)
    setValues(values)
  }, []);
  
  function handleFlag(x: number, y: number) {
    console.log(`Flagged ${x}, ${y}`)

    if (gameStatus !== GameStatus.IN_PROGRESS) return
    
    if (x < 0 || x >= NUMBER_ROWS_COLUMNS || y < 0 || y >= NUMBER_ROWS_COLUMNS) {
      return
    }

    flags[x][y] = 1 - flags[x][y]
    setFlags([...flags])
  }

  function resursiveClick(x: number, y: number) {
    console.log(`Clicked on ${x}, ${y}`)

    if (x < 0 || x >= NUMBER_ROWS_COLUMNS || y < 0 || y >= NUMBER_ROWS_COLUMNS) {
      return
    }

    if (known[x][y] === 0) {
      setUnknownCells(--unknownCells)
    }

    known[x][y] = 1
    setKnown([...known])

    if (values[x][y] === 0) {
      const xMin = Math.max(0, x - 1)
      const xMax = Math.min(NUMBER_ROWS_COLUMNS - 1, x + 1)
      const yMin = Math.max(0, y - 1)
      const yMax = Math.min(NUMBER_ROWS_COLUMNS - 1, y + 1)

      for (let i=xMin; i <= xMax ; i++) {
        for (let j=yMin; j <= yMax ; j++) {
          if (bomb[i][j] === 1 || (i === x && j === y) || (known[i][j] === 1)) {
            continue
          }
          resursiveClick(i, j)
        }
      }
    }
  }

  async function updateBoardProbabilities() {
    aiPlayerService.computeVectorRepresentation(known, values)
    setIsLoading(aiPlayerService.getGuessableMask())

    console.log(`g.bomb = ${bomb}`)
    console.log(`g.values = ${values}`)
    console.log(`g.known = ${known}`)
    
    let errorDuringPrediction = false
    while (aiPlayerService.hasMoreLocationsToPredict() && !errorDuringPrediction) {
      await aiPlayerService.loadBatchOfPoints().then((res: CellPredictionResponse[]) => {
        // get maximum of cell probabilities
        let max = Math.max(...res.map(x => Number.isNaN(x.safe_click_probability) ? 0 : x.safe_click_probability))
  
        // if max is zero, set to one. No scaling is needed since all values are zero
        max = max === 0 ? 1 : max
  
        // set each safeClickProb to normalizated probability that the cell is safe to click
        res.forEach((prediction) => {
          const [x, y] = prediction.location
          safeClickProbs[x][y] = prediction.safe_click_probability / max
          isLoading[x][y] = 0
        })
        
        // update state
        setSafeClickProbs([...safeClickProbs])
        setIsLoading([...isLoading])
      })
      .catch(err => {
        console.log(err)
        errorDuringPrediction = true
      });
    }
  }

  function handleClick(x: number, y: number) {

    if (gameStatus !== GameStatus.IN_PROGRESS) {
      return
    }

    if (known[x][y] === 1) {
      return
    }

    if (bomb[x][y] === 1) {
      setGameStatus(GameStatus.LOST)
      return
    }

    resursiveClick(x, y)

    console.log(`unknownCells = ${unknownCells}`)

    if (unknownCells === NUM_BOMBS) {
      setGameStatus(GameStatus.WON)
      return
    }

    updateBoardProbabilities()
  }

  function restartGame() {
    const { bomb, values } = generateBombsValues()
    setBomb(bomb)
    setValues(values)

    setKnown(generateNewBoard(0))
    setFlags(generateNewBoard(0))
    setSafeClickProbs(generateNewBoard(0))
    setIsLoading(generateNewBoard(0))
    setGameStatus(GameStatus.IN_PROGRESS)

    setUnknownCells(NUMBER_ROWS_COLUMNS * NUMBER_ROWS_COLUMNS)
  }

  return (<div 
      className="flex game-view flex-wrap">
    <div 
      className="game-panel flex-wrap cursor-pointer mr-[10rem]"
      style={{
        width: BOARD_SIZE + BOARD_UNIT,
        height: BOARD_SIZE + BOARD_UNIT
      }}>
    {<GameBoard known={known} bomb={bomb} flags={flags} values={values} 
            handleClick={handleClick} handleFlag={handleFlag} gameStatus={gameStatus}/>
    }
    </div>
    <div 
      className="ai-panel cursor-not-allowed"
      style={{
        width: BOARD_SIZE + BOARD_UNIT,
        height: BOARD_SIZE + BOARD_UNIT
      }}>
    {gameStatus === GameStatus.IN_PROGRESS 
      ? <AIPredictionBoard known={known} values={values} safeClickProbs={safeClickProbs} isLoading={isLoading}/>
      : <FinalScreen restartGame={restartGame} gameStatus={gameStatus}/>}
    </div>
  </div>)
}