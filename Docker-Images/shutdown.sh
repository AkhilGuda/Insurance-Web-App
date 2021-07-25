#!/bin/bash

echo "Stopping the server..."
pkill gunicorn

while true
do
    pid=`ps aux | grep -i gunicorn | grep -v grep | awk '{print $2}' | tail -1`
    if [ "$pid" == "" ];then
        echo "Server stopped."
        exit 0
    fi
done