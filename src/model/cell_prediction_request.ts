export interface CellPredictionRequest {
  // [x, y] of point being predicted
  readonly location: number[]

  // encoded representation of board. Starting from top left to bottom right store each cell in byte using schema
  //     outOfBoard << 5 | isKnown << 4 | val = 00BKVVVV
  readonly encodedBoardSection: string

  // guess size. the number of cells centered around the guess cell is guessSize ^ 2
  readonly guessSize: number
}
