import { BOARD_SIZE_CSS, FLAG_SIZE_CSS, PROB_SIZE_CSS } from "@/constants/game_board";
import FlagIcon from '@mui/icons-material/Flag';
import CircleIcon from '@mui/icons-material/Circle';

interface HiddenCellProps {
  colorClass?: string
  manualColor?: string
  handleClick: () => void
  handleFlag: () => void
  flagged: boolean
  displayProb?: number
  showBomb: boolean,
  showQuestionMark: boolean
}

export function HiddenCell({ colorClass, manualColor, handleClick, handleFlag, flagged, displayProb, showBomb, showQuestionMark } : HiddenCellProps) {
  function getCenterComp() {
    if (flagged) {
      return (<div
          style={{
            color: "#ff0000",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: BOARD_SIZE_CSS,
            height: BOARD_SIZE_CSS,
          }}
        > 
          <FlagIcon
            style={{
              width: FLAG_SIZE_CSS,
              height: FLAG_SIZE_CSS,
            }}
          />
      </div>)
    }

    else if (displayProb !== undefined) {
      const changeColor = (displayProb > 0.3) && (displayProb < 0.7)
      return (<div
        style={{
          color: changeColor ? "white" : "black",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: PROB_SIZE_CSS,
          height: PROB_SIZE_CSS
        }}
        className="font-extrabold prob-text sm:text-xs"
      > {showQuestionMark ? '?' : displayProb.toFixed(2)} </div>)
    }

    else if (showBomb === true) {
      return (<div
        style={{
          color: "#ff0000",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: BOARD_SIZE_CSS,
          height: BOARD_SIZE_CSS,
        }}
      > 
        <CircleIcon
          style={{
            width: FLAG_SIZE_CSS,
            height: FLAG_SIZE_CSS,
          }}
        />
      </div>)
    }

    else {
      return ""
    }
  }
  
  return (
    <div
      className={`${manualColor ? '' : colorClass} border border-black text-4xl`}
      style={{
        'display': 'grid',
        placeItems: 'center',
        width: BOARD_SIZE_CSS,
        height: BOARD_SIZE_CSS,
        backgroundColor: manualColor
      }}
      onClick={handleClick}
      onContextMenu={(e) => {
        e.preventDefault() // prevent the default behaviour when right clicked
        handleFlag()
      }}
    >
      {getCenterComp()}
    </div>
  );
}