var express = require('express');
var app = express();
var fs = require("fs");
var request = require('request');


var server = app.listen(9999, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});


app.get('/getMyData', function (req, res) {

    var action = req.params.action;
    var state = req.params.state;

    var response = {temperature: 78, humidity: 50};
    res.header("Content-Type", "application/json");
    res.json(response);
    console.log(response);
});

var b = {temperature: 56, humidity: 20};

var url = 'http://192.168.1.102:39500';

var minutes = 10, the_interval = minutes * 60 * 1000;

setInterval(function() {
    console.log("I am doing my 1 minutes check");

    request({
        url: url,
        method: "POST",
        json: b
    });
    // do your stuff here
}, the_interval);
