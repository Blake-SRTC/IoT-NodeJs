
var socket = io();

document.getElementById('obj1').onclick = function() {
    if (document.getElementById('obj1').checked) {

        socket.emit('lights', {status:"1"});

    } else {

        socket.emit('lights', {status:"0"});
        
    }
}