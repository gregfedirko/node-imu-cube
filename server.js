var serialPortModule = require('serialport');
var SerialPort = serialPortModule.SerialPort

var sp = new SerialPort("/dev/tty.usbmodem1421", {
  baudrate: 115200,
  parser: serialPortModule.parsers.readline("\n")
});

sp.on("open", function() {
  console.log("serialport opened");

  sp.on("data", function(data) {
    console.log(data);
  });

});