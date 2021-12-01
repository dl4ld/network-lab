#!/bin/bash
HOSTNAME=$(hostname)
while :; do
	msg=$(mosquitto_sub -h 172.20.0.2 -C 1 -t $HOSTNAME)
	echo $msg
done
