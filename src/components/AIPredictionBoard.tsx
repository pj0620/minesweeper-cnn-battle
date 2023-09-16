import { ExposedCell } from "@/components/cell/ExposedCell";
import { HiddenCell } from "@/components/cell/HiddenCell";
import { BOARD_SIZE, UNKNOWN_COLOR_CLASS_1, UNKNOWN_COLOR_CLASS_2, NUMBER_ROWS_COLUMNS, AI_HEADER_COLOR, AI_KNOWN_COLOR_CLASS, BOARD_UNIT, HEADER_HEIGHT_SCALE } from "@/constants/game_board";
import { LoadingCell } from "./cell/LoadingCell";

interface AIPredictionBoardProps {
  known: number[][]
  values: number[][]
  safeClickProbs: number[][]
  isLoading: number[][]
}

export function AIPredictionBoard({ known, values, safeClickProbs, isLoading } : AIPredictionBoardProps) {
  function getCell(index: number) {
    const i = Math.floor(index / NUMBER_ROWS_COLUMNS)
    const j = index % NUMBER_ROWS_COLUMNS

    const colorIdx = (Math.floor(index / NUMBER_ROWS_COLUMNS) + index) % 2

    if (isLoading[i][j] === 1) {
      return (<LoadingCell 
        key={index} 
        manualColor={"#000000"}
      />)
    }
    
    else if (known[i][j] === 0) {
      const prob = safeClickProbs[i][j]

      let red = 113 + prob * (255 - 113)
      red = Math.min(red, 255)
      red = Math.max(red, 0)
      
      let green = 206 * (1 - prob)
      green = Math.min(green, 255)
      green = Math.max(green, 0)

      let blue = 188 * (1 - prob)
      blue = Math.min(blue, 255)
      blue = Math.max(blue, 0)

      return (<HiddenCell 
        key={index} 
        manualColor={`rgb(${red} ${green} ${blue})`}
        handleClick={() => {}}
        handleFlag={() => {}}
        flagged={false}
      />)
    }

    return (<ExposedCell 
      key={index}
      colorClass={AI_KNOWN_COLOR_CLASS[colorIdx]}
      value={values[i][j]}
      handleClick={() => {}}
    />)    
  }

  return (
    <div 
      className="flex flex-wrap"
      style={{
        width: BOARD_SIZE + BOARD_UNIT,
        height: BOARD_SIZE + BOARD_UNIT
      }}>
        <div 
          className="text-5xl font-semibold"
          style={{
            width: BOARD_SIZE + BOARD_UNIT,
            height: (BOARD_SIZE / NUMBER_ROWS_COLUMNS) * HEADER_HEIGHT_SCALE + BOARD_UNIT,
            backgroundColor: AI_HEADER_COLOR,
            display: 'grid',
            placeItems: 'center'
          }}>
            🤖AI🤖
        </div>
      {Array.from({ length: NUMBER_ROWS_COLUMNS * NUMBER_ROWS_COLUMNS }).map((_, index) => (
        getCell(index)
      ))}
    </div>
  );
}