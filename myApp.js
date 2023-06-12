require('dotenv').config();
let bodyParser = require('body-parser');
let express = require('express');
let app = express();

absolutePath = __dirname + '/views/index.html'
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    let response = req.method + " " + req.path + " - " + req.ip;
    console.log(response);
    next();
});
app.use('/public', express.static(__dirname + '/public'));

app.get("/",(req, res) => {
    // res.send('Hello Express');
    res.sendFile(absolutePath);
});


app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        response = "Hello json".toUpperCase();
      } else {
        response = "Hello json";
      }

    res.json({
    message: response
    });
});

app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({
        time: req.time
    });
});

app.get('/:word/echo', (req, res) => {

    let word = req.params.word;

    res.json({
        echo: word
    });
});

app.get('/name', (req, res) => {

    let firstName = req.query.first
    let lastName = req.query.last
    res.json({
        name: firstName + " " + lastName
    });
});

app.post('/name', (req, res) => {

    let firstName = req.body.first
    let lastName = req.body.last
    res.json({
        name: firstName + " " + lastName
    });
});
































 module.exports = app;
