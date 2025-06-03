FROM ubuntu:20.04

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y mpich build-essential

WORKDIR /app

COPY hello.c .

RUN mpicc -o hello hello.c

CMD ["mpirun", "-np", "2", "./hello"]
