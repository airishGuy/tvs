#!/bin/bash

while true; do
  echo "Starting tvs.js..."
  node tvs.js
  echo "tvs.js crashed. Restarting in 5 seconds..."
  sleep 5
done