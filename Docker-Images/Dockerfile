FROM ubuntu:21.04

RUN apt -y update
RUN apt install -y python3 
RUN apt install -y python3-pip
# RUN apt install -y curl

WORKDIR /binaries

COPY insurance*.tar.gz .

RUN python3 -m pip install /binaries/insurance*.tar.gz

WORKDIR /scripts

COPY startup.sh .
COPY shutdown.sh .
COPY restart.sh .

RUN chmod +x /scripts/* \
    && chmod -R 777 /scripts