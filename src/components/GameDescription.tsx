
interface GameDescriptionProps {

}

export function GameDescription({  } : GameDescriptionProps) {
  return (
    <div
      className="flex flex-col bg-slate-300 text-black m-4 p-3"
    >
      <h1 className="text-lg text-bold">Game Description</h1>
      <ul>
        <li>• On the <i>left</i> board, <i>left</i>-click to click cell, and <i>right</i>-click to flag</li>
        <li>• The <i>right</i> board contains AI recommendations for safe places to click. </li>
        <li>• <span style={{color: "darkgreen"}}>Green</span> = higher chance cell is safe to click</li>
        <li>• <span style={{color: "darkred"}}>Red</span> = lower chance cell is safe to click</li>
      </ul>
    </div>
  );
}