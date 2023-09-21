import { NUMBER_ROWS_COLUMNS, NUM_BOMBS } from "@/constants/game_board";

export const generateNewBoard = (value: number) => Array.from(
  { length: NUMBER_ROWS_COLUMNS }, () => Array.from({ length: NUMBER_ROWS_COLUMNS }, () => value)
)

export function generateBombsValues() {
  let placedBombs = 0;
  const bomb = generateNewBoard(0)
  const values = generateNewBoard(0)
  while (placedBombs < NUM_BOMBS) {
    const x = Math.floor(Math.random() * NUMBER_ROWS_COLUMNS);
    const y = Math.floor(Math.random() * NUMBER_ROWS_COLUMNS);
    if (bomb[x][y] === 1) continue;

    bomb[x][y] = 1;
    placedBombs++;

    for (let i = x - 1; i < x + 2; i++) {
      for (let j = y - 1; j < y + 2; j++) {
        if (i < 0 || j < 0 || i >= NUMBER_ROWS_COLUMNS || j >= NUMBER_ROWS_COLUMNS) continue
        values[i][j] += 1
      }
    }
  }

  return { bomb, values }
}

export function bytesToBase64(bytes: number[]): string {
  const uint8Array = new Uint8Array(bytes);
  let binaryString = '';
  uint8Array.forEach(byte => {
    binaryString += String.fromCharCode(byte);
  });
  return btoa(binaryString);
}
