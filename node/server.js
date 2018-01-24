var express = require("express");
var bodyParser  = require("body-parser");
var rest = require("./REST.js");
var app  = express();
var morgan = require('morgan')

function REST(){
    var self = this;
    self.configureExpress();
}

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type");
    next();
});

REST.prototype.configureExpress = function() {
    var self = this;
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(morgan('tiny'))
    var router = express.Router();
    app.use('/api', router);
    var rest_router = new rest(router);
    self.startServer();
}

REST.prototype.startServer = function() {
    app.listen(3000,function(){
        console.log("All right my friend, sky is the limit ! enjoy !");
    });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
}

new REST();
