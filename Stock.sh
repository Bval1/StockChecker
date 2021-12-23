#!/bin/bash
t=1
echo "Checking stock..."
while [ $t -le 5 ]
do
    node --no-warnings app.js
    t=$(($t + 1))
    sleep 2s
done
echo "Done"
