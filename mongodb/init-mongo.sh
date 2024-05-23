#!/bin/bash

# 데이터 임포트
mongoimport --host localhost --db test --collection user --type json --file /docker-entrypoint-initdb.d/init.json --jsonArray
