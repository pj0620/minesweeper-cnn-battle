import { ExposedCell } from "@/components/ExposedCell";
import { HiddenCell } from "@/components/HiddenCell";
import { BOARD_SIZE, UNKNOWN_COLOR_CLASS_1, UNKNOWN_COLOR_CLASS_2, NUMBER_ROWS_COLUMNS } from "@/constants/game_board";

interface GameBoardProps {
  known: number[][]
  bomb: number[][]
  flags: number[][]
  values: number[][]
  handleClick: (x: number, y: number) => void
  handleFlag: (x: number, y: number) => void
}

export function GameBoard({ known, bomb, flags, values, handleClick, handleFlag } : GameBoardProps) {
  function getCell(index: number) {
    const i = Math.floor(index / NUMBER_ROWS_COLUMNS)
    const j = index % NUMBER_ROWS_COLUMNS

    const colorIdx = (Math.floor(index / NUMBER_ROWS_COLUMNS) + index) % 2

    if (known[i][j] === 1) {
      return (
        <ExposedCell 
            key={index}
            colorIndex={colorIdx}
            value={values[i][j]}
            handleClick={() => {handleClick(i, j)}}
          />
      )
    } else {
      return (<HiddenCell key={index} colorIndex={colorIdx} 
        handleClick={() => {handleClick(i, j)}}
        handleFlag={() => {handleFlag(i, j)}}
        flagged={flags[i][j] === 1}/>)
    }
    
  }

  return (
    <div 
      className="flex flex-wrap cursor-pointer"
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
        getCell(index)
      ))}
    </div>
  );
}