
var express = require('express');
var path = require('path');
var fs = require('fs-extra');

var bodyParser = require('body-parser');
var http = require('http');
var swig = require('swig');

import { IndexRoute } from './routes/index';
import { ApiRoute } from './routes/apiRoute';

var app = express();

app.set('port', process.env.PORT || '3001');
swig.setDefaults({ cache: false });

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public/')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Register our templating engine
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', true);

http.createServer(app).listen(app.get('port'), function () {
    // Application routes
    new IndexRoute(app);   
    new ApiRoute(app);

    console.log("Root folder", __dirname);

   // fs.emptyDir(path.join(__dirname));

    fs.mkdirs(path.join(__dirname, '/views'));
    fs.mkdirs(path.join(__dirname, '/public'));

    fs.copy(path.join(__dirname + '/../../server/views'), path.join(__dirname, '/views'), (err) => {
        if (err) return console.error(err);     
    });

    fs.copy(path.join(__dirname + '/../../build'), path.join(__dirname, '/public'), (err) => {
        if (err) return console.error(err);     
    });

    console.log("Express server listening on port " + app.get('port'));
});
//});