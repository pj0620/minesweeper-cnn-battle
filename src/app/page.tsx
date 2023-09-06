import { GameView } from '@/board/GameView';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <GameView />
    </main>
  )
}
