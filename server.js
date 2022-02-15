const http = require('http');
const express = require('express');
const app = express(); // Start an express app
const path = require('path') // Relative windows or Mac etc

// RBP GPIO
const Gpio = require('onoff').Gpio;

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

// Iniciamos el servidor [este no usara sockets]
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

        // RBP GPIO
        // console.log(typeof data.status);
    });
});

// Puerto de escucha Web
server.listen(3000);



// RBP GPIO control de los pines
const LED1 = new Gpio(26, 'out');
const LED2 = new Gpio(19, 'out');
const LED3 = new Gpio(13, 'out');

function rasp(status) {
    if (status === '1') {
        if (LED1.readSync() === 0) {
            LED1.writeSync(1);
        }
    } else if (status === '2') {
        if (LED1.readSync() === 1) {
            LED1.writeSync(0);
        }
    }
    if (status === '3') {
        if (LED2.readSync() === 0) {
            LED2.writeSync(1);
        }
    } else if (status === '4') {
        if (LED2.readSync() === 1) {
            LED2.writeSync(0);
        }
    }
    if (status === '5') {
        if (LED3.readSync() === 0) {
            LED3.writeSync(1);
        }
    } else if (status === '6') {
        if (LED3.readSync() === 1) {
            LED3.writeSync(0);
        }
    }
}
