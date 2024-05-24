# MongoDB Injection Lab

MongoDB Injection 실습 환경 입니다.
front-end는 express로 구성되어 있습니다.

## Quick Start

1. Install docker
2. Install docker compose
3. Clone the repository: `git clone https://github.com/BobongKu/MongoDB-Injection-Lab.git`
4. run `docker-compose up`
5. start on [http://localhost:3000](http://localhost:3000)

If you want to view a MongoDB database, you would use the following commands

1. `docker exec -it mongodb /bin/bash`
2. `mongosh`
3. `db.user.find({})`

## Reference

[https://learn.dreamhack.io/285](https://learn.dreamhack.io/285)
[https://portswigger.net/web-security/nosql-injection](https://portswigger.net/web-security/nosql-injection)
[https://www.bobong.blog/post/NoSQL%20Injection](https://www.bobong.blog/post/NoSQL%20Injection)
