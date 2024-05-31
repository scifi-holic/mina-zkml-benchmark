FROM rust:1.67

ENV OS=linux

RUN apt-get update -y
RUN apt-get install python -y

RUN apt-get install jq -y

WORKDIR /root

COPY . .
RUN bash install_dep_run.sh

CMD source .env/bin/activate; cargo nextest run benchmarking_tests::tests::run_benchmarks_ --no-capture
