const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
// routes
const router = require('./routes/routing');
// controller
const raspberry = require('./controller/rbp');
const arduino = require('./controller/arduino');

// Video Stream
const videoStream = require('./controller/videoStream');

videoStream.acceptConnections(app, {
    width: 1280,
    height: 720,
    fps: 16,
    encoding: 'JPEG',
    quality: 7 // lower is faster, less quality
},
'/stream.mjpg', true);

// public
app.use(express.static('public'));

app.use("/", router);

// Configuranto el socket
// Debe escuchar la variable server y no directo a app de express
var io = require("socket.io").listen(server);

io.on('connection', function(socket) {

    // Nueva conexion, estado inicial RBP
    var estado = raspberry.rbpEstado();
    io.emit('init', {status:estado});

    // Escucha
    socket.on('lights', function(data) {
        
        console.log(data);
        // Arduino
        arduino.port.write(data.status);
        // RBP GPIO
        raspberry.rasp(data.status);

        // Tiempo real a todos los usuarios
        estado = raspberry.rbpEstado();
        io.emit('init', {status:estado});
        
    });

});

// Puerto de escucha Web
server.listen(3000);
