import React, { useEffect, useState } from 'react'
import './App.css';
import scrolltobottom from "react-scroll-to-bottom"
// we need to the socket instance as props from app.js
function Chat({socket,username,room}) {
    const [currentmessage, setcurrentmessage]=useState('')
    //
    const [messagelist, setmessagelist]=useState([])
   
    const sendmessage=async()=>{
        if(currentmessage!==''){
            //all of the info that we send
            const messagedata={
                room:room,
                autor:username,
                message:currentmessage,
                time:new Date(Date.now()).getHours() + ":" 
                + new Date(Date.now()).getMinutes()
            }
            await socket.emit('sendmessage',messagedata)
            setmessagelist((list)=>[...list,messagedata])
          
        }

    }
  //
    useEffect(()=>{
        socket.on('receivemessage',(data)=>{
            setmessagelist((list)=>[...list,data])
            console.log(data)
             //you can see this meesage in web browesr by inspect except in the  one that triggered the server
            // When the server sends a response using Socket.IO, 
            // the response is sent back to all connected sockets 
            // except for the one that triggered the server.
                 })
    },[socket])
  return (
    <div className='chat-window'>
      <div className='chat-header'><p>live chat</p></div>
      <div className='chat-body'>
        <scrolltobottom className={'message-container'}>
        {messagelist.map((messagecontent)=>{
            // When the server sends a response using Socket.IO, 
            // the response is sent back to all connected sockets 
            // except for the one that triggered the server.
        // to have the message in my oun instance set the message list not only in socket.io also in socket.emit
            return <div className='message' id={username===messagecontent.autor ? "you" : "other"}> 
                <div>
                    <div className='message-content'>
                        <p>{messagecontent.message}</p>
                    </div>
                    <div className='message-meta'>
                        <p>{messagecontent.time}</p>
                        <p>{messagecontent.autor}</p>
                    </div>
               
                </div>
            </div>
        })}
        </scrolltobottom>
      </div>
      <div className='chat-footer'>
        <input type='text' placeholder='hey...'  onChange={(Event)=>{
       setcurrentmessage(Event.target.value)
     }}
     // to send message when we press enter
     
     onKeyPress={(Event)=>{
        Event.key==="Enter" && sendmessage()
     }}
     />
        <button onClick={sendmessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat


// // Client side
// socket.emit('my_event', 'Hello, server!', (response) => {
//     console.log(response);
//   });
  
//   // Server side
//   socket.on('my_event', (data, callback) => {
//     console.log(data);
//     // send response back to the specific client
//     callback('Hello, client!');
//   });
  