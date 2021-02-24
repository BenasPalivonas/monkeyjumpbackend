const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const knex = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
});
app.listen(process.env.PORT, () => {
    console.log("app is running on port ", process.env.PORT);
})
app.get('/', (req, res) => {
    res.json("its working");
})
app.get('/top3', (req, res) => {
    var top3Players = [];
    knex('players').orderBy('score', 'desc').limit(3).then(user => {
        top3Players.push(user);
    });
    res.json(top3Players);
});
app.post('/addToLeaderBoard', (req, res) => {
    const { name, score } = req.body;
    console.log(req.body);
    knex('players').insert({
        name: name,
        score: score
    }).then(res.json("registered"));
});