const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('a user connected');
  io.emit('message',`User${ socket.id.substr(0, 5)}: has joined`);

  socket.on('message', (message) => {
    io.emit('message', `User${ socket.id.substr(0, 5)}: ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    io.emit('message',`User${ socket.id.substr(0, 5)}: has disconnected`);
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));