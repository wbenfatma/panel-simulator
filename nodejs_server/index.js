const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const crypto = require('crypto');
const app = express();
const server = http.Server(app);
const io = socketio(server);

app.get('/',
        (req, res) => {
          res.sendFile(path.join(__dirname, 'index.html'));
        });

io.on('connection', function(socket) {

    console.log('\nA new camera is connected, socket id: ' + socket.id);
    
    socket.on('register', function(data) {

	// Retrieve Register request attributes
	console.log('\nThe camera is registering ...');
	console.log('Register JSON request:\n' + JSON.stringify(data));
        var category = data.category;
        var action = data.action;
        var correlation_id = data.correlation_id;
        var content = data.content;
        console.log('Request category: '+category+'\nRequest action: '+action+'\nCorrelation id: '+correlation_id);
        console.log('Register request content --> \nCamera id: '+content.camera_id+'\nOrganization Id: '+content.organization_id+'\nPassword: '+content.password+'\nRoom Id: '+content.room_id);

	// Send Register response
	const resp = {
	    correlation_id: correlation_id,
	    type: 'SUCCESS'
        };
        console.log('Register JSON response:\n' + JSON.stringify(resp));
        socket.emit('register', resp);
    });
 
    socket.on('login', function(data) {

	// Retrieve Login request attributes
	console.log('\nThe camera is logging in ...');
	console.log('Login JSON request:\n' + JSON.stringify(data));
        var category = data.category;
        var action = data.action;
        var correlation_id = data.correlation_id;
        var content = data.content;
        console.log('Request category: '+category+'\nRequest action: '+action+'\nCorrelation id: '+correlation_id);
        console.log('Login request content --> \nCamera id: '+content.camera_id+'\nOrganization Id: '+content.organization_id+'\nPassword: '+content.password);

	// Send Login response
	var token = crypto.randomBytes(32).toString('hex');
	const resp = {
	    correlation_id: correlation_id,
	    type: 'SUCCESS',
	    content: {
		auth_token: token
	    }
        };
        console.log('Login JSON response:\n' + JSON.stringify(resp));
        socket.emit('login', resp);
    });

    socket.on('logout', function(data) {

	// Retrieve Logout request attributes
	console.log('\nThe camera is logging out ...');
	console.log('Logout JSON request:\n' + JSON.stringify(data));
        var category = data.category;
        var action = data.action;
        var correlation_id = data.correlation_id;
        var auth_token = data.auth_token;
        console.log('Request category: '+category+'\nRequest action: '+action+'\nCorrelation id: '+correlation_id+'\nauth_token: '+auth_token);

	// Send Logout response
	const resp = {
	    correlation_id: correlation_id,
	    type: 'SUCCESS'
        };
        console.log('Logout JSON response:\n' + JSON.stringify(resp));
        socket.emit('logout', resp);
    });

    socket.on('disconnect', function() {
	console.log('\nThe camera is now disconnected ...');
        socket.disconnect();
    });
})

server.listen(5000, () => {
			  console.log('Listening on port 5000');
			  });
