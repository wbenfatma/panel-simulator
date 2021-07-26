const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const host = '0.0.0.0'
const port = 3000

const app = express();
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const server = require('http').Server(app)

const server_token = "wassim@benfatma";

const socketOptions = {
  transports: ["websocket"],
  path: '/socket',
}
const io = require('socket.io')(server, socketOptions)

io.on('connection', function(socket) {
    console.log('on user connected ' + socket.id);
    socket.auth = false;
   
    socket.on('login', function(data) {
        const body = data.content;
        console.log('token recieved is '+ body);
        console.log('connection is authenticated ' + socket.id);
        socket.emit("login", server_token);
    })
   
    socket.on('disconnect', function() {
        console.log('one user disconnected ' + socket.id);
    })

    setTimeout(function() {
        console.log('disconnecting the socket ' + socket.id);
        socket.disconnect();
    },1000);
})

server.listen(port, host, () => {
  console.log(`Example app listening at http://${host}:${port}`)
})
