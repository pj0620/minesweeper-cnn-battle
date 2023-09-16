import { BOARD_SIZE, NUMBER_ROWS_COLUMNS, VALUE_FONT_COLORS, KNOWN_COLOR_CLASS, BOARD_UNIT } from "@/constants/game_board";

interface ExposedCellProps {
  value: number
  colorClass: string
  handleClick: () => void
}

export function ExposedCell({ value, colorClass, handleClick } : ExposedCellProps) {
  return (
    <div
      className={`${colorClass} border border-black text-4xl`}
      style={{
        display: 'grid',
        placeItems: 'center',
        width: BOARD_SIZE / NUMBER_ROWS_COLUMNS + BOARD_UNIT,
        height: BOARD_SIZE / NUMBER_ROWS_COLUMNS + BOARD_UNIT,
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