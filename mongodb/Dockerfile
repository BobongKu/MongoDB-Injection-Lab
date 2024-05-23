FROM mongo

COPY init.json /docker-entrypoint-initdb.d/init.json
COPY init-mongo.sh /docker-entrypoint-initdb.d/init-mongo.sh

RUN chmod +x /docker-entrypoint-initdb.d/init-mongo.sh 
