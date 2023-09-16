"use client";

import { BOARD_SIZE, UNKNOWN_COLOR_CLASS_1, UNKNOWN_COLOR_CLASS_2, NUMBER_ROWS_COLUMNS, BOARD_UNIT } from "@/constants/game_board";
import { generateBombsValues, generateNewBoard } from "@/util/board_utils";
import { useEffect, useState } from "react";
import { GameBoard } from "./GameBoard";
import { GameStatus } from "@/board/game_state";
import { AIPredictionBoard } from "./AIPredictionBoard";
import { AIPlayerService } from "@/service/ai_player_service";

export function GameView() {
  const [bomb, setBomb] = useState(generateNewBoard(0))
  const [known, setKnown] = useState(generateNewBoard(0))
  const [values, setValues] = useState(generateNewBoard(0))
  const [flags, setFlags] = useState(generateNewBoard(0))

  const [safeClickProbs, setSafeClickProbs] = useState(generateNewBoard(0))
  const [isLoading, setIsLoading] = useState(generateNewBoard(0))

  const [gameStatus, setGameStatus] = useState(GameStatus.IN_PROGRESS)

  const aiPlayerService = new AIPlayerService()

  useEffect(() => {
    const { bomb, values } = generateBombsValues()
    setBomb(bomb)
    setValues(values)
    setIsLoading([...isLoading])
  }, []);
  
  function handleFlag(x: number, y: number) {
    console.log(`Flagged ${x}, ${y}`)
    
    if (x < 0 || x >= NUMBER_ROWS_COLUMNS || y < 0 || y >= NUMBER_ROWS_COLUMNS) {
      return
    }

    flags[x][y] = 1 - flags[x][y]
    setFlags([...flags])
  }

  function resursiveClick(x: number, y: number) {
    console.log(`Clicked on ${x}, ${y}`)

    if (bomb[x][y] === 1) {
      setGameStatus(GameStatus.LOST)
      return
    }

    if (x < 0 || x >= NUMBER_ROWS_COLUMNS || y < 0 || y >= NUMBER_ROWS_COLUMNS) {
      return
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

  function handleClick(x: number, y: number) {
    resursiveClick(x, y)
    
    if (gameStatus !== GameStatus.IN_PROGRESS) {
      return
    }

    aiPlayerService.computeVectorRepresentation(known, values)
    setIsLoading(aiPlayerService.getGuessableMask())

    aiPlayerService.loadBatchOfPoints()
  }
    
  

  return (<div 
      className="flex game-view flex-wrap">
    <div 
      className="game-panel flex-wrap cursor-pointer mr-[10rem]"
      style={{
        width: BOARD_SIZE + BOARD_UNIT,
        height: BOARD_SIZE + BOARD_UNIT
      }}>
    {gameStatus === GameStatus.IN_PROGRESS 
      ? <GameBoard known={known} bomb={bomb} flags={flags} values={values} handleClick={handleClick} handleFlag={handleFlag}/>
      : <h1>Game Over</h1>}
    </div>
    <div 
      className="ai-panel cursor-not-allowed"
      style={{
        width: BOARD_SIZE + BOARD_UNIT,
        height: BOARD_SIZE + BOARD_UNIT
      }}>
    {gameStatus === GameStatus.IN_PROGRESS 
      ? <AIPredictionBoard known={known} values={values} safeClickProbs={safeClickProbs} isLoading={isLoading}/>
      : <h1>Game Over</h1>}
    </div>
  </div>)
}