var express = require('express');
var serialPortModule = require('serialport');
var SerialPort = serialPortModule.SerialPort;

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('Socket.io connected');
});


app.get('/', function(req, res) {
  res.sendfile('index.html');
});

var sp = new SerialPort("/dev/tty.usbmodem1421", {
  baudrate: 115200,
  parser: serialPortModule.parsers.readline("\n")
});

sp.on("open", function() {
  console.log("serialport opened");


  sp.on("data", function(data) {
    io.emit('data', {data: data});
  });

});


http.listen(3000, function(){
  console.log('listening on *:3000');
});

