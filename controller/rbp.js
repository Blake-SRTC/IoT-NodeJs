// RBP GPIO control de los pines
// RBP GPIO

const Gpio = require('onoff').Gpio;

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

module.exports.rasp = rasp;