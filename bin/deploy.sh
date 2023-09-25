#!/bin/bash

gcloud run deploy minesweeper-cnn-fe \
  --region us-east1 \
  --project minesweeper-cnn \
  --platform managed \
  --allow-unauthenticated \
  --source .