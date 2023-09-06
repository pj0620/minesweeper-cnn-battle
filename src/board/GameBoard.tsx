import { ExposedCell } from "@/components/ExposedCell";
import { BOARD_SIZE, UNKNOWN_COLOR_CLASS_1, UNKNOWN_COLOR_CLASS_2, NUMBER_ROWS_COLUMNS } from "@/constants/game_board";
import { useState } from "react";

interface GameBoardProps {
  known: number[][]
  bomb: number[][]
  flags: number[][]
  values: number[][]
}

export function GameBoard({ known, bomb, flags, values } : GameBoardProps) {
  return (
    <div 
      className="flex flex-wrap"
      style={{
        width: BOARD_SIZE + 'vh',
        height: BOARD_SIZE + 'vh'
      }}>
        <div 
          style={{
            width: BOARD_SIZE + 'vh',
            height: BOARD_SIZE / NUMBER_ROWS_COLUMNS + 'vh',
            backgroundColor: 'darkgreen'
          }}>

        </div>
      {Array.from({ length: NUMBER_ROWS_COLUMNS * NUMBER_ROWS_COLUMNS }).map((_, index) => (
        <ExposedCell 
          key={index}
          colorIndex={(Math.floor(index / NUMBER_ROWS_COLUMNS) + index) % 2}
          value={values[Math.floor(index / NUMBER_ROWS_COLUMNS)][index % NUMBER_ROWS_COLUMNS]}
        />
      ))}
    </div>
  );
}