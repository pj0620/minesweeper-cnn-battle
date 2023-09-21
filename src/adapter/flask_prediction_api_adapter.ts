import { CellPredictionRequest } from "@/model/cell_prediction_request";
import { CellPredictionResponse } from "@/model/cell_prediction_response";
import { PredictionApiAdapter } from "./prediction_api_adapter";
import { API_ENDPOINT, BOARD_SECTIONS_KEY, PREDICTIONS_KEY, RECS_PATH } from "@/constants/api";

export class FlaskPredictionApiAdapter implements PredictionApiAdapter {
  public async predictCells(request: CellPredictionRequest[]): Promise<CellPredictionResponse[]> {
    console.log("FlaskPredictionApiAdapter.predictCells call with following cells");
    console.log(request);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({[BOARD_SECTIONS_KEY]: request})
    };
    
    const predictionString = await fetch(API_ENDPOINT + RECS_PATH, requestOptions)
      .then(response => response.text())
      .catch(error => {
        console.log('error while calling flask prediction api: ', error)
        throw new Error('error while calling flask prediction api: ', error)
      });

    const predictionsResp = JSON.parse(predictionString)
    const predictions: CellPredictionResponse[] = predictionsResp[PREDICTIONS_KEY];

    return predictions;
  }
}