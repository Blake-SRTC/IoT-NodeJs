const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

// routes
const router = require('./routes/routing');
// controller
const raspberry = require('./controller/rbp');
const arduino = require('./controller/arduino');
// public
app.use(express.static('public'));

app.use("/", router);

// Configuranto el socket
// Debe escuchar la variable server y no directo a app de express
var io = require("socket.io").listen(server);

io.on('connection', function(socket) {

    socket.on('lights', function(data) {

        arduino.port.write(data.status);
        console.log(data);

        // RBP GPIO
        raspberry.rasp(data.status);
    });
});

// Puerto de escucha Web
server.listen(3000);