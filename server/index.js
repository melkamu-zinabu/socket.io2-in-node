import  Express  from "express";
const app=Express();
import http from "http"
// const http = require("http");
import cors from "cors"
//It is a security mechanism implemented by web browsers to restrict web page scripts and other resources from making cross-domain HTTP requests.
//By default, web browsers enforce a Same-Origin Policy,  which means that a web page can only make HTTP requests to the same domain that the page 

//const cors = require("cors");
import { Server } from "socket.io";// it is not default export
//const Server = require("socket.io");
app.use(cors());//this Enable CORS for all requests
const server = http.createServer(app);
const io=new Server(server,{
    cors:{
        // Enable CORS for specific domains
        //. By default, it allows requests from all domains, but you can specify which domains are allowed by setting the origin option to a single string or an array of strings.
        origin:"http://localhost:3000",
        methods:["Get", "Post"],
    }
})
//io.on('connection', callback) listens for a "connection" event from a client, and "callback" is called when a client connects to the Socket.IO server. The "socket" argument in the callback represents the connection between the client and the server. 
//The socket argument in the io.on('connection', callback) function is automatically passed by Socket.IO when a new client connects to the server.
//When a client connects to the Socket.IO server, Socket.IO creates a new Socket object to represent the connection between the client and the server.
io.on('connection',(socket)=>{
console.log(socket.id)
socket.on('disconnect',()=>{
    console.log('user disconnected',socket.id)
})
})

server.listen(3001,()=>{
    console.log('server running')
})