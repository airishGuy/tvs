#!/bin/bash

while true; do
  echo "Starting faucet.js..."
  node faucet.js
  echo "tvs.js crashed. Restarting in 5 seconds..."
  sleep 5
done