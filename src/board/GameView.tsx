"use client";

import { BOARD_SIZE, UNKNOWN_COLOR_CLASS_1, UNKNOWN_COLOR_CLASS_2, NUMBER_ROWS_COLUMNS } from "@/constants/game_board";
import { generateBombsValues, generateNewBoard } from "@/util/board_utils";
import { useEffect, useState } from "react";
import { GameBoard } from "./GameBoard";

export function GameView() {
  const [bomb, setBomb] = useState(generateNewBoard(0))
  const [known, setKnown] = useState(generateNewBoard(0))
  const [values, setValues] = useState(generateNewBoard(0))

  useEffect(() => {
    const { bomb, values } = generateBombsValues()
    setBomb(bomb)
    setValues(values)
  }, []);  

  return (
    <GameBoard known={known} bomb={bomb} flags={[]} values={values} />
  );
}