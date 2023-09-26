import { BOARD_SIZE, NUMBER_ROWS_COLUMNS, VALUE_FONT_COLORS, KNOWN_COLOR_CLASS, UNKNOWN_COLOR_CLASS, BOARD_UNIT, BOARD_SIZE_CSS, LOADING_CELL_COLOR } from "@/constants/game_board";
import LoopIcon from '@mui/icons-material/Loop';
import { useState, useEffect } from "react";

interface LoadingCellProps {
  colorClass?: string
  manualColor?: string
}

export function LoadingCell({ colorClass, manualColor} : LoadingCellProps) {
  return (
    <div
      className={`${manualColor ? '' : colorClass} border border-black text-4xl animated-content`}
      style={{
        'display': 'grid',
        placeItems: 'center',
        width: BOARD_SIZE_CSS,
        height: BOARD_SIZE_CSS,
        backgroundColor: LOADING_CELL_COLOR
      }}
      onContextMenu={(e) => {
        e.preventDefault() // prevent the default behaviour when right clicked
      }}
    >
      <div
          style={{
            color: "blue"
          }}
        > </div>
    </div>
  );
}