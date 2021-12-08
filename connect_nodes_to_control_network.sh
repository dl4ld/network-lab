#!/bin/bash
CNTS=`docker ps | grep quagga | awk '{print $1}' | tr '\n' ' '`
IFS=' ' read -r -a array <<< "$CNTS"
C=10
for element in "${array[@]}"
do

	echo "docker network connect --ip 172.20.0.$C bridge $element"
	`docker network connect --ip 172.20.0.$C ctrl1 $element`
	H=$(docker exec $element hostname)
	if [[ $H == "as"* ]]; then
		echo "docker exec $element sh -c 'ip route del 0/0'"
		`docker exec $element sh -c 'ip route del 0/0'`
		#`docker exec -d $element sh -c '/mqtt_sub.sh > /tmp/mqtt_out'`
	fi
	C=$((C+1))
done
