const express = require('express');
const { MongoClient } = require("mongodb");
const path = require('path');
const app = express();

// Adding Body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const uri = "mongodb://mongodb:27017";
const client = new MongoClient(uri,{ monitorCommands:true });

client.on('commandStarted', (event) => {
    console.log('MongoDB Command Started:', event);
});

async function run() {
    try {
        await client.connect();
        console.log("Connected to the Database.");

        const database = client.db('test');
        const userCollection = database.collection('user');

        // Login (POST request)
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
                console.error("Error during login:", error);
                res.status(500).send('Internal Server Error');
            }
        });

        // Login (GET request)
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
                console.error("Error during login:", error);
                res.status(500).send('Internal Server Error');
            }
        });

        // $where query (GET request)
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
                console.error("Error during login:", error);
                res.status(500).send('Internal Server Error');
            }
        });

        // $where query (POST request)
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
                console.error("Error during login:", error);
                res.status(500).send('Internal Server Error');
            }
        });

        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
        });

        // Starting Express app
        const PORT = process.env.PORT || 3000;
        const server = app.listen(PORT, function() {
            console.log(`server is running on port ${PORT}.`);
        });

    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

run().catch(console.dir);
