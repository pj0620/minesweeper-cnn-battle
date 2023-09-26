import { BOARD_SIZE, BOARD_UNIT, GAME_VIEW_BACKGROUND_COLOR, HEADER_HEIGHT_SCALE, LOSE_COLOR, NUMBER_ROWS_COLUMNS, WIN_COLOR } from "@/constants/game_board";
import { GameStatus } from "@/model/game_state";

export function Credits() {
  return (
    <div
    className="flex flex-col align-bottom bg-slate-300 mr-4 mb-4">
      <a href="https://www.linkedin.com/in/paul-moat-a3a185128/">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" 
          alt="Linkedin"
          className="w-10 h-10 m-2"/>
      </a>

      <a href="https://github.com/pj0620">
        <img 
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
          alt="Github"
          className="w-10 h-10  m-2"/>
      </a>
    </div>
  );
}