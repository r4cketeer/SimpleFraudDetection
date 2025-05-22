#!/bin/bash
HOST="0.0.0.0"
PORT=8000

start() {
  echo "Setting up environment..."

  if [ -f "requirements.txt" ]; then
    echo "Installing dependencies from requirements.txt..."
    pip install -r requirements.txt
  else
    echo "requirements.txt not found. Please create it with the necessary dependencies."
    exit 1
  fi

  echo "Starting Fraud Detection API Server..."
  nohup uvicorn server:app --reload --host $HOST --port $PORT > log.log 2>&1 &
  echo "Fraud Detection API Server server is running in the background. Logs are being written to log.log."
}

start_debug() {
  uvicorn server:app --reload --host $HOST --port $PORT
}

stop() {
  echo "Stopping Fraud Detection API Server..."
  pkill -f "uvicorn.*$PORT"
  echo "Fraud Detection API Server stopped."
}

if [ "$1" == "start" ]; then
  start
elif [ "$1" == "start_debug" ]; then
  start_debug
elif [ "$1" == "stop" ]; then
  stop
else
  echo "Usage: fraud_detection <start|stop>"
  exit 1
fi