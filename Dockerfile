FROM kathara/quagga

ARG DEBIAN_FRONTEND="noninteractive"
ADD mqtt_sub.sh /

RUN apt update && \
    apt install -y mosquitto-clients
