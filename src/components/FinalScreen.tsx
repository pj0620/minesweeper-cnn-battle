import { BOARD_SIZE, BOARD_UNIT, HEADER_HEIGHT_SCALE, LOSE_COLOR, NUMBER_ROWS_COLUMNS, WIN_COLOR } from "@/constants/game_board";
import { GameStatus } from "@/model/game_state";

interface FinalScreenProps {
  restartGame: () => void
  gameStatus: GameStatus
}

export function FinalScreen({ restartGame, gameStatus } : FinalScreenProps) {
  const height = (HEADER_HEIGHT_SCALE / NUMBER_ROWS_COLUMNS + 1) * BOARD_SIZE

  const mainColor = gameStatus === GameStatus.WON ? WIN_COLOR : LOSE_COLOR

  return (
    <div 
      className="flex flex-wrap cursor-pointer cursor-auto"
      style={{
        width: BOARD_SIZE + BOARD_UNIT,
        height: height + BOARD_UNIT,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: mainColor
      }}>
        <h1 className="text-6xl text-white">YOU</h1>
        <h1 className="text-6xl text-white">{gameStatus === GameStatus.WON ? 'WON' : 'LOST'}</h1>
        <div 
          className="text-4xl bg-white px-2 py-2 mt-3 rounded-2xl cursor-pointer"
          onClick={restartGame}
          style={{
            color: mainColor
          }}
          >
            REPLAY
        </div>
    </div>
  );
}