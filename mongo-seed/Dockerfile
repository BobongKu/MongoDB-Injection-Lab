FROM debian:buster-slim

RUN apt-get update && apt-get install dpkg
RUN apt-get install wget -y

RUN wget https://fastdl.mongodb.org/tools/db/mongodb-database-tools-debian81-x86_64-100.9.4.deb
RUN apt install ./mongodb-database-tools-*-100.9.4.deb -y

COPY ./init.json /init.json

CMD mongoimport --host mongodb --collection user --type json --file /init.json --jsonArray
