#!/bin/bash
CNTS=`docker ps | grep eclipse-mosquitto | awk '{print $1}' | tr '\n' ''`
`docker network connect --ip 172.20.0.2 mqtt $CNTS`
