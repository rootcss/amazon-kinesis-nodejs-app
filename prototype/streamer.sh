#!/bin/bash

while true
do
	echo "Press [CTRL+C] to stop.."
	sleep 3
	data=`date`
	node stream.js "$data"
done
