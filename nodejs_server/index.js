const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const crypto = require('crypto');
const app = express();
const server = http.Server(app);
const socketOptions = {
  transports: ["websocket"],
}

const io = require('socket.io')(server, socketOptions)

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

    socket.on('camera', function(data) {

	var category = data.category;
	var action = data.action;
	var correlation_id = data.correlation_id;
	var content = data.content;
	var auth_token = data.auth_token;

	if (action == 'register') {

		// Retrieve Register request attributes
		console.log('\nThe camera is registering ...');
		console.log('Register JSON request:\n' + JSON.stringify(data));
		console.log('Request category: '+category+'\nRequest action: '+action+'\nCorrelation id: '+correlation_id);
		console.log('Register request content --> \nCamera id: '+content.camera_id+'\nOrganization Id: '+content.organization_id+'\nPassword: '+content.password+'\nRoom Id: '+content.room_id);

		// Send Register response
		const resp = {
		    correlation_id: correlation_id,
		    type: 'SUCCESS'
		};
		console.log('Register JSON response:\n' + JSON.stringify(resp));
		socket.emit('camera', resp);

	} else if(action == 'login') {

		// Retrieve Login request attributes
		console.log('\nThe camera is logging in ...');
		console.log('Login JSON request:\n' + JSON.stringify(data));
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
		socket.emit('camera', resp);

		// Send multiple requests for test purposes
		syncSleep(10000);
		console.log('\nStart sending requests to camera...');

		// Get system information up request
		var req = {
		    category: 'system',
		    action: 'get_system_information',
		    correlation_id: uuidv4()
		};
		console.log('Get system information JSON request:\n' + JSON.stringify(req));
		socket.emit('camera', req);

		// Move up request
		var req = {
		    category: 'camera',
		    action: 'move',
		    correlation_id: uuidv4(),
		    content: {
			direction: 'up'
		    }
		};
		console.log('Move JSON request:\n' + JSON.stringify(req));
		socket.emit('camera', req);

		// Move down request
		req = {
		    category: 'camera',
		    action: 'move',
		    correlation_id: uuidv4(),
		    content: {
			direction: 'down'
		    }
		};
		console.log('Move JSON request:\n' + JSON.stringify(req));
		socket.emit('camera', req);

		// Move right request
		req = {
		    category: 'camera',
		    action: 'move',
		    correlation_id: uuidv4(),
		    content: {
			direction: 'right'
		    }
		};
		console.log('Move JSON request:\n' + JSON.stringify(req));
		socket.emit('camera', req);

		// Move left request
		req = {
		    category: 'camera',
		    action: 'move',
		    correlation_id: uuidv4(),
		    content: {
			direction: 'left'
		    }
		};
		console.log('Move JSON request:\n' + JSON.stringify(req));
		socket.emit('camera', req);

		// Stop moving left request
		req = {
		    category: 'camera',
		    action: 'stop_moving',
		    correlation_id: uuidv4()
		};
		console.log('Stop JSON request:\n' + JSON.stringify(req));
		socket.emit('camera', req);

		// Zoom add request
		req = {
		    category: 'camera',
		    action: 'zoom',
		    correlation_id: uuidv4(),
		    content: {
			type: 'add'
		    }
		};
		console.log('Move JSON request:\n' + JSON.stringify(req));
		socket.emit('message', req);

		console.log('Move JSON request:\n' + JSON.stringify(req));
		socket.emit('camera', req);

		// Zoom dec request
		req = {
		    category: 'camera',
		    action: 'zoom',
		    correlation_id: uuidv4(),
		    content: {
			type: 'dec'
		    }
		};
		console.log('Move JSON request:\n' + JSON.stringify(req));
		socket.emit('camera', req);


	       // Switch scene request
		req = {
		    category: 'video',
		    action: 'switch_scene',
		    correlation_id: uuidv4(),
		    content: {
			id: 2
		    }
		};
		console.log('Switch scene JSON request:\n' + JSON.stringify(req));
		socket.emit('camera', req);

		// Start record request
		req = {
		    category: 'video',
		    action: 'start_record',
		    correlation_id: uuidv4(),
		    content: {
			title: 'test_record_3'
		    }
		};
		console.log('Start record  JSON request:\n' + JSON.stringify(req));
		socket.emit('camera', req);

		// Get record session request
		req = {
		    category: 'video',
		    action: 'get_record_session',
		    correlation_id: uuidv4()
		};
		console.log('Get record session JSON request:\n' + JSON.stringify(req));
		socket.emit('camera', req);

		// Stop record request
		req = {
		    category: 'video',
		    action: 'stop_record',
		    correlation_id: uuidv4()
		};
		console.log('Stop record JSON request:\n' + JSON.stringify(req));
		socket.emit('camera', req);

		// Get record session request
		req = {
		    category: 'video',
		    action: 'get_record_session',
		    correlation_id: uuidv4()
		};
		console.log('Get record session JSON request:\n' + JSON.stringify(req));
		socket.emit('camera', req);

		// Create live profile request
		req = {
		    category: 'publishing',
		    action: 'create_live_profile',
		    correlation_id: uuidv4(),
		    content: {
			name: 'wassimbf',
			url: "\"rtmp://a.rtmp.youtube.com/live1\"",
			username: 'wassim',
			password: 'kastKast',
			key: 's0j4-w12f-ahvv-7h3b-b3dd'
		    }
		};
		console.log('Create live profile JSON request:\n' + JSON.stringify(req));
		socket.emit('camera', req);

		// Read live profile request
		req = {
		    category: 'publishing',
		    action: 'read_live_profile',
		    correlation_id: uuidv4(),
		    content: {
			id: 154
		    }
		};
		console.log('Read live profile JSON JSON request:\n' + JSON.stringify(req));
		socket.emit('camera', req);

		// Update live profile request
		req = {
		    category: 'publishing',
		    action: 'update_live_profile',
		    correlation_id: uuidv4(),
		    content: {
			id: 154,
			name: 'youtubewassimbfkalyzee',
			url: "\"rtmp://a.rtmp.youtube.com/live2\"",
			username: 'wassim',
			password: 'kastKast',
			key: 's0j4-w12f-ahvv-7h3b-b3dv'
		    }
		};
		console.log('Update live profile JSON JSON request:\n' + JSON.stringify(req));
		socket.emit('camera', req);

		 // Read live profile request
		req = {
		    category: 'publishing',
		    action: 'read_live_profile',
		    correlation_id: uuidv4(),
		    content: {
			id: 154
		    }
		};
		console.log('Read live profile JSON JSON request:\n' + JSON.stringify(req));
		socket.emit('camera', req);

		// Enable live profile request
		req = {
		    category: 'publishing',
		    action: 'enable_live_profile',
		    correlation_id: uuidv4(),
		    content: {
			id: 9,
			auto: true
		    }
		};
		console.log('Enable live profile JSON JSON request:\n' + JSON.stringify(req));
		socket.emit('camera', req);

		// Delete live profile request
		req = {
		    category: 'publishing',
		    action: 'delete_live_profile',
		    correlation_id: uuidv4(),
		    content: {
			id: 147
		    }
		};
		console.log('Delete live profile JSON JSON request:\n' + JSON.stringify(req));
		socket.emit('camera', req);

		// Start live session request
		req = {
		    category: 'video',
		    action: 'start_live',
		    correlation_id: uuidv4()
		};
		console.log('Start live JSON request:\n' + JSON.stringify(req));
		socket.emit('camera', req);

	} else if (action == 'logout') {

		// Retrieve Logout request attributes
		console.log('\nThe camera is logging out ...');
		console.log('Logout JSON request:\n' + JSON.stringify(data));
		console.log('Request category: '+category+'\nRequest action: '+action+'\nCorrelation id: '+correlation_id+'\nauth_token: '+auth_token);

		// Send Logout response
		const resp = {
		    correlation_id: correlation_id,
		    type: 'SUCCESS'
		};
		console.log('Logout JSON response:\n' + JSON.stringify(resp));
		socket.emit('camera', resp);

	} else {
		// Retrieve Logout request attributes
		console.log('\nThe camera sents a response ...');
		console.log('Camera JSON response:\n' + JSON.stringify(data));
	}
    });
    
})

server.listen(5000, () => {
			  console.log('Listening on port 5000');
			  });



