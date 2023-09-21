import { BOARD_SIZE, NUMBER_ROWS_COLUMNS, VALUE_FONT_COLORS, KNOWN_COLOR_CLASS, BOARD_UNIT, BOARD_SIZE_CSS } from "@/constants/game_board";

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
        width: BOARD_SIZE_CSS,
        height: BOARD_SIZE_CSS,
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