FROM mongo

COPY ./init.json /init.json

CMD mongoimport --host mongodb --collection user --type json --file /init.json --jsonArray
