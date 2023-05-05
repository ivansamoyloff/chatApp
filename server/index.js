const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
const server = http.createServer();

const users = [];
const messages = [];
const connections = [];
const typing = [];

const socketServer = io(server, {
  cors:{
    origin: '*'
  }
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

socketServer.on('connection', socket => {
  connections.push(socket);

  socket.on('disconnect', data => {
    connections.splice(connections.indexOf(socket), 1);
  })

  socket.on('setUser', data => {
    users.push(data);
  })

  socket.on('sendMessage', data => {
    messages.push(data);
    socketServer.emit('addMessage', messages);
  })

  socket.on('setTypingMessage', data => {
    if(typing.filter(item => data.userId === item.userId).length === 0 ){
      typing.push(data);
      console.log(typing);
    }  
    socketServer.emit('messageTyping', typing)
  })

  socket.on('unsetTypingMessage', data => {
    typing.splice(typing.indexOf(data), 1);
    socketServer.emit('messageTyping', typing)
  })

});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
