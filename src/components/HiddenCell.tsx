import { BOARD_SIZE, NUMBER_ROWS_COLUMNS, VALUE_FONT_COLORS, KNOWN_COLOR_CLASS, UNKNOWN_COLOR_CLASS } from "@/constants/game_board";
import FlagIcon from '@mui/icons-material/Flag';

interface HiddenCellProps {
  colorIndex: number
  handleClick: () => void
  handleFlag: () => void
  flagged: boolean
}

export function HiddenCell({ colorIndex, handleClick, handleFlag, flagged } : HiddenCellProps) {
  return (
    <div
      className={`${UNKNOWN_COLOR_CLASS[colorIndex]} border border-black text-4xl`}
      style={{
        display: 'grid',
        placeItems: 'center',
        width: BOARD_SIZE / NUMBER_ROWS_COLUMNS + 'vh',
        height: BOARD_SIZE / NUMBER_ROWS_COLUMNS + 'vh',
      }}
      onClick={handleClick}
      onContextMenu={(e) => {
        e.preventDefault() // prevent the default behaviour when right clicked
        handleFlag()
      }}
    >
      {flagged ? <div
          style={{
            color: "#ff0000",
            transform: 'translate(0%, -10%) scale(1.8)'
          }}
          className="font-extrabold"
        > <FlagIcon/> </div> : ""}
    </div>
  );
}