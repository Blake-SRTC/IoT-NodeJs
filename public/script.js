var socket = io();

document.getElementById('lightOn').onclick = function() {
    socket.emit('lights', {status:"1"});
};
document.getElementById('lightOff').onclick = function() {
    socket.emit('lights', {status:"0"});
};