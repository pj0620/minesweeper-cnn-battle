import { CellPredictionRequest } from "@/model/cell_prediction_request";
import { CellPredictionResponse } from "@/model/cell_prediction_response";
import { PredictionApiAdapter } from "./prediction_api_adapter";

export class FlaskPredictionApiAdapter implements PredictionApiAdapter {
  predictCells(request: CellPredictionRequest[]): Promise<CellPredictionResponse[]> {
    console.log("FlaskPredictionApiAdapter.predictCells call with following cells");
    console.log(request);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({board_sections: request})
    };
    
    fetch("http://localhost:5000/recommendations", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    return Promise.resolve([]);
  }
}