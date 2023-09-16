import { CellPredictionRequest } from "@/model/cell_prediction_request";
import { CellPredictionResponse } from "@/model/cell_prediction_response";
import { PredictionApiAdapter } from "./prediction_api_adapter";

export class FlaskPredictionApiAdapter implements PredictionApiAdapter {
  predictCells(request: CellPredictionRequest): Promise<CellPredictionResponse> {
    throw new Error("Method not implemented.");
  }
}