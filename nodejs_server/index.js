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

// used to generate a correlation ID - for test purposes
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function syncSleep(milliseconds){
 var start = new Date().getTime();
 var end=0;
 while( (end-start) < milliseconds){
     end = new Date().getTime();
 }
}

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

	// Send multiple requests for test purposes
	console.log('\nStart sending requests to camera...');

	// Move up request
	var move_req = {
	    category: 'camera',
	    action: 'move',
	    correlation_id: uuidv4(),
	    content: {
		direction: 'up'
	    }
        };
        console.log('Move JSON request:\n' + JSON.stringify(move_req));
        socket.emit('message', move_req);

        // Move down request
        move_req = {
	    category: 'camera',
	    action: 'move',
	    correlation_id: uuidv4(),
	    content: {
		direction: 'down'
	    }
        };
        console.log('Move JSON request:\n' + JSON.stringify(move_req));
        socket.emit('message', move_req);

        // Move right request
        move_req = {
	    category: 'camera',
	    action: 'move',
	    correlation_id: uuidv4(),
	    content: {
		direction: 'right'
	    }
        };
        console.log('Move JSON request:\n' + JSON.stringify(move_req));
        socket.emit('message', move_req);

        // Move left request
        move_req = {
	    category: 'camera',
	    action: 'move',
	    correlation_id: uuidv4(),
	    content: {
		direction: 'left'
	    }
        };
        console.log('Move JSON request:\n' + JSON.stringify(move_req));
        socket.emit('message', move_req);

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

    socket.on('message', function(data) {

	// Retrieve Logout request attributes
	console.log('\nThe camera sents a response ...');
	console.log('Camera JSON response:\n' + JSON.stringify(data));
    });
    
    socket.on('disconnect', function() {
	console.log('\nThe camera is now disconnected ...');
        socket.disconnect();
    });
})

server.listen(5000, () => {
			  console.log('Listening on port 5000');
			  });
