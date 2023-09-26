#!/bin/bash

docker build -t minesweeper-cnn-fe .
docker run -it --rm -p 8080:8080 --name ms_cnn_contianer minesweeper-cnn-fe