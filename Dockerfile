FROM ubuntu:14.04
RUN mkdir -p /src
ADD . /src

RUN  cd /src; npm install

EXPOSE  8080 
