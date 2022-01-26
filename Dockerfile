FROM kathara/quagga

ARG DEBIAN_FRONTEND="noninteractive"

ADD mqtt_listener /root/

RUN curl -sL https://deb.nodesource.com/setup_16.x > setup_16.x  && chmod +x setup_16.x && ./setup_16.x

RUN apt update && \
    apt install -y mosquitto-clients nodejs npm

RUN cd /root/ && npm install


