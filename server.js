const http = require('http');
const express = require('express');
const app = express(); // Start an express app
const path = require('path') // Relative windows or Mac etc

// Variable server que contendra la app de express
const server = http.createServer(app);

const router = express.Router(); // futher configuration

// Buena practica juntar los archivos publicos y solo exponer index
app.use(express.static('public'));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

router.get('*', (req, res) => {
    res.json("Pagina no encontrada 404")
});

// Definimos para poder usar router
app.use("/", router);

// Iniciamos el servidor
// app.listen(5000, () => {
//     console.log("App iniciada en puerto: ", 5000);
// });

////////////////////////////////////////////////////////////////////////////////
// Codigo para interactuar con arduino
var SerialPort = require("serialport");
const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
    delimiter: '\r\n'
});

var port = new SerialPort('COM5', {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

port.pipe(parser);

// Configuranto el socket
// Debe escuchar la variable server y no directo a app de express
var io = require("socket.io").listen(server);

io.on('connection', function(socket) {

    socket.on('lights', function(data) {
        port.write(data.status);
        console.log(data);
    });
});

// Puerto de escucha Web
server.listen(3000);
