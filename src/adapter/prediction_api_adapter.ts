import { CellPredictionRequest } from "@/model/cell_prediction_request";
import { CellPredictionResponse } from "@/model/cell_prediction_response";

export interface PredictionApiAdapter {
  /*
    Predicts the probability that a cell at the given location is safe to click.
  */
  predictCells(request: CellPredictionRequest): Promise<CellPredictionResponse>
}