import { BOARD_SIZE, NUMBER_ROWS_COLUMNS, VALUE_FONT_COLORS, KNOWN_COLOR_CLASS } from "@/constants/game_board";

interface ExposedCellProps {
  value: number
  colorIndex: number
  handleClick: () => void
}

export function ExposedCell({ value, colorIndex, handleClick } : ExposedCellProps) {
  return (
    <div
      className={`${KNOWN_COLOR_CLASS[colorIndex]} border border-black text-4xl`}
      style={{
        display: 'grid',
        placeItems: 'center',
        width: BOARD_SIZE / NUMBER_ROWS_COLUMNS + 'vh',
        height: BOARD_SIZE / NUMBER_ROWS_COLUMNS + 'vh',
      }}
      onClick={handleClick}>
        <div
          style={{
            color: VALUE_FONT_COLORS[value]
          }}
          className="font-extrabold"
        > { value !== 0 ? value : '' } </div>
    </div>
  );
}