"use client";

import { BOARD_SIZE, UNKNOWN_COLOR_CLASS_1, UNKNOWN_COLOR_CLASS_2, NUMBER_ROWS_COLUMNS } from "@/constants/game_board";
import { generateBombsValues, generateNewBoard } from "@/util/board_utils";
import { useEffect, useState } from "react";
import { GameBoard } from "./GameBoard";

export function GameView() {
  const [bomb, setBomb] = useState(generateNewBoard(0))
  const [known, setKnown] = useState(generateNewBoard(0))
  const [values, setValues] = useState(generateNewBoard(0))
  const [flags, setFlags] = useState(generateNewBoard(0))

  useEffect(() => {
    const { bomb, values } = generateBombsValues()
    setBomb(bomb)
    setValues(values)
  }, []);
  
  function handleFlag(x: number, y: number) {
    console.log(`Flagged ${x}, ${y}`)
    
    if (x < 0 || x >= NUMBER_ROWS_COLUMNS || y < 0 || y >= NUMBER_ROWS_COLUMNS) {
      return
    }

    flags[x][y] = 1 - flags[x][y]
    setFlags([...flags])
  
  }

  function handleClick(x: number, y: number) {
    console.log(`Clicked on ${x}, ${y}`)

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
          if (bomb[i][j] === 1 
            || (i === x && j === y) 
            || (known[i][j] === 1)) {
            continue
          }
          handleClick(i, j)
        }
      }
    }
  }

  return (
    <GameBoard known={known} bomb={bomb} flags={flags} values={values} 
    handleClick={handleClick} handleFlag={handleFlag}/>
  );
}