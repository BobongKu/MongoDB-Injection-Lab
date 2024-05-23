const express = require('express');
const { MongoClient } = require("mongodb");
const path = require('path');
const app = express();

// Body-parser 미들웨어 추가
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 데이터베이스 연결
const uri = "mongodb://mongodb:27017";
const client = new MongoClient(uri,{ monitorCommands:true });

client.on('commandStarted', (event) => {
    console.log('MongoDB Command Started:', event);
  });

async function run() {
    try {
        await client.connect();
        console.log("데이터베이스에 연결되었습니다");

        const database = client.db('test');
        const userCollection = database.collection('user');

        // 로그인 (POST 요청)
        app.post('/postlogin', async (req, res) => {
            const { name, password } = req.body;
            const query = { name, password };

            console.log(query)

            try {
                const user = await userCollection.findOne(query);
                if (user) {
                    res.status(200).send('success');
                } else {
                    res.status(401).send('wrong');
                }
            } catch (error) {
                console.error("로그인 중 에러:", error);
                res.status(500).send('내부 서버 오류');
            }
        });

        // 로그인 (GET 요청)
        app.get('/getlogin', async (req, res) => {
            const { name, password } = req.query; 
            const query = { name, password };

            console.log(query)

            try {
                const user = await userCollection.findOne(query);
                console.log(user)
                if (user) {
                    res.status(200).send('success');
                } else {
                    res.status(401).send('wrong');
                }
            } catch (error) {
                console.error("로그인 중 에러:", error);
                res.status(500).send('내부 서버 오류');
            }
        });

        // $where 사용 (GET 요청)
        app.get('/getwherelogin', async (req, res) => {
            const name = req.query.name
            const password = req.query.password

            console.log(name)

            try {
                const user = await userCollection.findOne({'$where':`this.name =='${name}' && this.password==${password}`});
                console.log(user)
                if (user) {
                    res.status(200).send('success');
                } else {
                    res.status(401).send('wrong');
                }
            } catch (error) {
                console.error("로그인 중 에러:", error);
                res.status(500).send('내부 서버 오류');
            }
        });

         // $where 사용 (POST 요청)
         app.post('/postwherelogin', async (req, res) => {
            const name = req.body.name
            const password = req.body.password

            console.log(name)

            try {
                const user = await userCollection.findOne({'$where':`this.name =='${name}' && this.password==${password}`});
                console.log(user)
                if (user) {
                    res.status(200).send('success');
                } else {
                    res.status(401).send('wrong');
                }
            } catch (error) {
                console.error("로그인 중 에러:", error);
                res.status(500).send('내부 서버 오류');
            }
        });

        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
        });

        // Express 앱 시작
        const PORT = process.env.PORT || 3000;
        const server = app.listen(PORT, function() {
            console.log(`서버가 포트 ${PORT}에서 실행 중입니다`);
        });

    } catch (error) {
        console.error("데이터베이스 연결 중 에러:", error);
    }
}

run().catch(console.dir);
