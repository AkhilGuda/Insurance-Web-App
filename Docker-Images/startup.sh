#!/bin/bash

echo "Staring the server..."
nohup insurance-deploy start_server --port 5000 --timeout 20000 --num_workers 5 > server.out 2>&1 &
echo "Server started."