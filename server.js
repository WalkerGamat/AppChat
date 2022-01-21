const express = require('express');
const path = require('path');
const socketio = require("socket.io");
const http = require('http');


//bind router to server then server to sockets
const app = express()
const server = http.createServer(app);
const io = socketio(server);
const formatMessage = require('./others/formatMessage')

app.use(express.static(path.join(__dirname,'public')));
app.get('/view',)
//start the server
server.listen(4001,()=>{console.log("server Up on port 4001")})

//socket from server to clients
io.on('connection',(socket)=>{

//broadcast message from user who is connecting to all other users
    socket.on('user-name',(name)=>{
        socket.broadcast.emit('infos-chat',name+' has joined the chat')//only used with socket.on() or io.on()
    })
//user disconnects, its listen to disconnect message
    socket.on('disconnect',(name)=>{
        //emit to everybody
        io.emit('infos-chat', 'user has left the chat');
    })
//listen to chatMessage
    socket.on('chatMessage',(user,msg)=>{
        //socket.broadcast.emit('chat-message',msg)
        io.emit('chat-message',formatMessage(user,msg))//timestamped
    })

});

