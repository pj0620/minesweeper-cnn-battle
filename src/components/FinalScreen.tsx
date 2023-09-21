import { BOARD_SIZE, BOARD_UNIT, HEADER_HEIGHT_SCALE, NUMBER_ROWS_COLUMNS } from "@/constants/game_board";
import { GameStatus } from "@/model/game_state";

interface FinalScreenProps {
  restartGame: () => void
  gameStatus: GameStatus
}

export function FinalScreen({ restartGame, gameStatus } : FinalScreenProps) {
  const height = (HEADER_HEIGHT_SCALE / NUMBER_ROWS_COLUMNS + 1) * BOARD_SIZE

  return (
    <div 
      className="flex flex-wrap cursor-pointer bg-white cursor-auto"
      style={{
        width: BOARD_SIZE + BOARD_UNIT,
        height: height + BOARD_UNIT,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <h1 className="text-6xl text-black">YOU</h1>
        <h1 className="text-6xl text-black">{gameStatus === GameStatus.WON ? 'WON' : 'LOST'}</h1>
        <div 
          className="text-4xl bg-black text-white px-2 py-2 mt-3 rounded-2xl cursor-pointer"
          onClick={restartGame}
          >
            REPLAY
        </div>
    </div>
  );
}