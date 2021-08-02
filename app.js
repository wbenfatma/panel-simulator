const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const port = 8080

const app = express();
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

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

    socket.on('kast_register', async (data, callback) => {
        console.log(data)
        console.log('---')
        const { content } = data
        const organization = {};
        // const organization = await Organization.findById(content.organization)
        let response = {};
        if (organization['token'] !== content.token) {
          response = {
            correlation_id: data.correlation_id,
            type: "ERROR",
            content: {
              error_message: "Token does not match Organization ID"
            }
          }
        } else {
        //   const device = await Device.create({
        //     _organization: content.organization,
        //     hardwareID: content.id,
        //   })
        //   await device.save()
          response = {
            correlation_id: data.correlation_id,
            type: "SUCCESS",
            content: {
                message: "Device registered"
            }
          }
        }
        callback(response)
      })
   
    socket.on('disconnect', function() {
        console.log('one user disconnected ' + socket.id);
    })

    setTimeout(function() {
        console.log('disconnecting the socket ' + socket.id);
        socket.disconnect();
    }, 1000);
})

server.listen(port, () => {
  console.log(`Example app listening at https://panel.local/`)
})
