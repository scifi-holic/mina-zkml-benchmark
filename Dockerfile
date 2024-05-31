FROM ubuntu

ENV OS=linux

COPY . .

RUN bash install_dep_run.sh

RUN apt-get install jq -y
