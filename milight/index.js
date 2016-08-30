var Milight = require('node-milight-promise').MilightController;
var commands = require('node-milight-promise').commands2;
var express = require('express');
var app = express();


var light = new Milight({
        ip: "192.168.1.5",
        delayBetweenCommands: 75,
        commandRepeat: 2
    }),
    zone = 0;


app.get('/white/:mode', function (req, res) {

   var mode = req.params.mode

   console.log(mode)

    if (mode == 'on') light.sendCommands(commands.rgbw.on(zone), commands.rgbw.whiteMode(zone), commands.rgbw.brightness(100));

    if (mode == 'off') light.sendCommands(commands.rgbw.off(zone));

    light.close();

    res.send('OK');

   
});

app.get('/brightness/:val', function (req, res) {

    var val = req.params.val

    console.log(val)

    light.sendCommands(commands.rgbw.on(zone), commands.rgbw.whiteMode(zone), commands.rgbw.brightness(val));

    light.close();

    res.send('OK');

   
});

app.get('/hue/:val/:level', function (req, res) {

    var val = parseInt(req.params.val)

    var level = parseInt(req.params.level)

    console.log("HUE: " + val)

    light.sendCommands(commands.rgbw.on(zone), commands.rgbw.hue(val), commands.rgbw.brightness(level));

    light.close();

    res.send('OK');

   
});

app.get('/rgb/:r/:g/:b/:level', function (req, res) {

    var red = req.params.r
    var green = req.params.g
    var blue = req.params.b
    var level = req.params.level

    console.log("RGB: red:" + red + ", green:" + green + ", blue:" + blue)

    light.sendCommands(commands.rgbw.on(zone), commands.rgbw.rgb255(red, green, blue), commands.rgbw.brightness(level));

    light.close();

    res.send('OK');

   
});

var server = app.listen(3333, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})

// Important Notes:
//    Instead of providing the global broadcast address which is the default, you should provide the IP address
//    of the Milight Controller for unicast mode. Don't use the global broadcast address on Windows as this may give
//    unexpected results. On Windows, global broadcast packets will only be routed via the first network adapter. If
//    you want to use a broadcast address though, use a network-specific address, e.g. for `192.168.0.1/24` use
//    `192.168.0.255`.

