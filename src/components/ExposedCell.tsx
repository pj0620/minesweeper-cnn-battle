import { BOARD_SIZE, UNKNOWN_COLOR_CLASS_1, UNKNOWN_COLOR_CLASS_2, NUMBER_ROWS_COLUMNS, KNOWN_COLOR_CLASS_1, KNOWN_COLOR_CLASS_2 } from "@/constants/game_board";
import { useState } from "react";

interface ExposedCellProps {
  value: number
  colorIndex: number
}

export function ExposedCell({ value, colorIndex } : ExposedCellProps) {
  const colorClasses = [KNOWN_COLOR_CLASS_1, KNOWN_COLOR_CLASS_2]

  return (
    <div
      className={`${colorClasses[colorIndex]} border border-black text-2xl`}
      style={{
        display: 'grid',
        placeItems: 'center',
        width: BOARD_SIZE / NUMBER_ROWS_COLUMNS + 'vh',
        height: BOARD_SIZE / NUMBER_ROWS_COLUMNS + 'vh',
      }}>
        <div> { value } </div>
    </div>
  );
}