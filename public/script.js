
var socket = io();

document.getElementById('obj1').onclick = function() {
    if (document.getElementById('obj1').checked) {

        socket.emit('lights', {status:"1"});

    } else {

        socket.emit('lights', {status:"2"});

    }
}

document.getElementById('obj2').onclick = function() {
    if (document.getElementById('obj2').checked) {

        socket.emit('lights', {status:"3"});

    } else {

        socket.emit('lights', {status:"4"});

    }
}

document.getElementById('obj3').onclick = function() {
    if (document.getElementById('obj3').checked) {

        socket.emit('lights', {status:"5"});

    } else {

        socket.emit('lights', {status:"6"});

    }
}