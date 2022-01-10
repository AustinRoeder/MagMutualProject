var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get('/user', function (req, res) {
    const users = JSON.parse(fs.readFileSync('users.json'));

    var returnUser;
    for (var user of users) {
        if (user.username === 'jdoe') {
            returnUser = user;
        }
    }

    res.send(returnUser)
})

app.listen(3000, function() {
    console.log("app listening on port 3000")
})