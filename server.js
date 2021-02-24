const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.listen(process.env.PORT, () => {
    console.log("app is running on port ", process.env.PORT);
})
app.get('/', (req, res) => {
    res.json("its working")
})