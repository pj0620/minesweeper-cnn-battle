export interface CellPredictionResponse {
  // [x, y] of point being predicted
  readonly location: [number, number]

  // probability that this point is safe to click
  readonly safeClickProbability: number

  // guess size. the number of cells centered around the guess cell is guessSize ^ 2
  readonly guessSize: number
}
