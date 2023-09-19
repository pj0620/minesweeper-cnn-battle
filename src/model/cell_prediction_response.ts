export interface CellPredictionResponse {
  // [x, y] of point being predicted
  readonly location: [number, number]

  // probability that this point is safe to click
  readonly safe_click_probability: number
}
