import { Socials } from "@/components/Socials";
import { GameDescription } from "@/components/GameDescription";
import { GameView } from "@/components/GameView";
import { GAME_VIEW_BACKGROUND_COLOR } from "@/constants/game_board";

export default function Home() {
  return (
    <main 
      className="flex min-h-screen flex-col items-center justify-between p-24"
      >
      <div className="w-full flex flex-row justify-center align-center">
        <h1 className="text-4xl text-bold pt-3 pb-2">Minesweeper AI Solver</h1>
      </div>
      <div className="flex flex-row items-end" 
      style = {{
        backgroundColor: GAME_VIEW_BACKGROUND_COLOR,
      }}>
        <div className="flex flex-col">
          <GameView />
          <GameDescription/>
        </div>
        <Socials />
      </div>
    </main>
  )
}
