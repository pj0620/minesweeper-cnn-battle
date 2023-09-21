import { ExposedCell } from "@/components/cell/ExposedCell";
import { HiddenCell } from "@/components/cell/HiddenCell";
import { BOARD_SIZE, NUMBER_ROWS_COLUMNS, UNKNOWN_COLOR_CLASS, KNOWN_COLOR_CLASS, HUMAN_HEADER_COLOR, BOARD_UNIT, HEADER_HEIGHT_SCALE } from "@/constants/game_board";
import { GameStatus } from "@/model/game_state";

interface GameBoardProps {
  known: number[][]
  bomb: number[][]
  flags: number[][]
  values: number[][]
  handleClick: (x: number, y: number) => void
  handleFlag: (x: number, y: number) => void
  gameStatus: GameStatus
}

export function GameBoard({ known, bomb, flags, values, handleClick, handleFlag, gameStatus } : GameBoardProps) {
  function getCell(index: number) {
    const i = Math.floor(index / NUMBER_ROWS_COLUMNS)
    const j = index % NUMBER_ROWS_COLUMNS

    const colorIdx = (Math.floor(index / NUMBER_ROWS_COLUMNS) + index) % 2

    if (known[i][j] === 1) {
      return (
        <ExposedCell 
            key={index}
            colorClass={KNOWN_COLOR_CLASS[colorIdx]}
            value={values[i][j]}
            handleClick={() => {handleClick(i, j)}}
          />
      )
    } else {
      return (<HiddenCell 
        key={index} 
        colorClass={UNKNOWN_COLOR_CLASS[colorIdx]}
        handleClick={() => {handleClick(i, j)}}
        handleFlag={() => {handleFlag(i, j)}}
        flagged={flags[i][j] === 1}
        showBomb={(bomb[i][j] === 1) && (gameStatus === GameStatus.LOST) }
      />)
    }
    
  }

  return (
    <div 
      className="flex flex-wrap cursor-pointer"
      style={{
        width: BOARD_SIZE + BOARD_UNIT,
        height: BOARD_SIZE + BOARD_UNIT
      }}>
        <div 
          className="text-5xl font-semibold"
          style={{
            width: BOARD_SIZE + BOARD_UNIT,
            height: (BOARD_SIZE / NUMBER_ROWS_COLUMNS) * HEADER_HEIGHT_SCALE + BOARD_UNIT,
            backgroundColor: HUMAN_HEADER_COLOR,
            display: 'grid',
            placeItems: 'center'
          }}>
            🧔Human🧔
        </div>
      {Array.from({ length: NUMBER_ROWS_COLUMNS * NUMBER_ROWS_COLUMNS }).map((_, index) => (
        getCell(index)
      ))}
    </div>
  );
}