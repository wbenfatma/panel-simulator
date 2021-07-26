var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var server_token = "wassim@benfatma";
io.on('connection',function(socket){
    console.log('on user connected '+socket.id);
    socket.auth = false;
    socket.on('login',function(data){
    var body = data.content;
    console.log('token recieved is '+body);
    console.log('connection is authenticated '+socket.id);
    socket.emit("login",server_token);
    })
    socket.on('disconnect',function(){
        console.log('one user disconnected '+socket.id);
    })
    setTimeout(function(){
        console.log('disconnecting the socket '+socket.id);
        socket.disconnect();
    },1000);
})

http.listen(3000,function(){
    console.log('server listening on port 3000');
})
