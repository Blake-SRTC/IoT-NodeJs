
//window.onload = () => {

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


    socket.on('init', function(data){
        const estado  = data.status;
        if (estado[0] === '1') {
            document.getElementById("obj1").checked = true;
        } else if (estado[0] === '0') {
            document.getElementById("obj1").checked = false;
        }

        if (estado[1] === '1') {
            document.getElementById("obj2").checked = true;
        } else if (estado[1] === '0') {
            document.getElementById("obj2").checked = false;
        }

        if (estado[2] === '1') {
            document.getElementById("obj3").checked = true;
        } else if (estado[2] === '0') {
            document.getElementById("obj3").checked = false;
        }    
    })

//}