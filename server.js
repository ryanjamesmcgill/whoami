
'use strict';

var express = require('express');
var useragent = require('express-useragent');

var app = express();

app.enable('trust proxy')
app.use(useragent.express());
app.get('/api/version', function(req, res){
    res.status(200).set({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }).send(JSON.stringify(process.versions));
});

app.get('/api/whoami', function(req, res){
    var output = {
        ipaddress: req.ip,
        language: null,
        software: [req.useragent.browser, req.useragent.version, req.useragent.os, req.useragent.platform].join(';')
    };

    var langs = req.headers['accept-language'].split(',');
    output.language = langs[0];



    res.status(200).set({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }).send(JSON.stringify(output));
});

app.use(function(req, res) {
    res.status(404).send("Sorry, this app only works on the '/api/whoami' endpoint.");
});

app.listen((process.env.PORT || 3000), function () {
    if(process.env.PORT){
        console.log('Node.js listening on port ' + process.env.PORT + '...');
    } else {
        console.log('Node.js listening on port 3000...');
    }
});
