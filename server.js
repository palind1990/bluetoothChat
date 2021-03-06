const express = require('express')
const socketIO = require("socket.io");
const app = express();
const server = app.listen(9000);
const io = socketIO(server);
const path = require('path')

const httpPort = 8000

var users = {};
var name = '';

app.use(express.static(path.join(__dirname, '_public')))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '_public/index.html'))
})

app.get('/:name', function(req, res){
  name = req.params.name;
  res.sendFile(path.join(__dirname, "/" + name + ".html"));
});

io.sockets.on("connection", function(socket){
  users[socket.id] = name;
  // node
  socket.on("nRoom", function(room){
      socket.join(room);
      socket.broadcast.in(room).emit("node new user", users[socket.id] + " new user has joined");
  });

  socket.on("node new message", function(data){
      io.sockets.in("nRoom").emit('node news', users[socket.id] + ": "+ data);
  });

  // python
  socket.on("pRoom", function(room){
      socket.join(room);
      socket.broadcast.in(room).emit("python new user", users[socket.id] + " new user has joined");
  });

  socket.on("python new message", function(data){
      io.sockets.in("pRoom").emit('python news', users[socket.id] + ": "+ data);
  });
});

app.listen(httpPort, function () {
  console.log(`Listening on port ${httpPort}!`)
})