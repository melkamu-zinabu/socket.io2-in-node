import React, { useState } from 'react'
// we need to the socket instance as props from app.js
function Chat({socket,username,room}) {
    const [currentmessage, setcurrentmessage]=useState('')
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
        }

    }
  return (
    <div>
      <div className='chatheader'><p>live chat</p></div>
      <div className='chatbody'></div>
      <div className='chatfooter'>
        <input type='text' placeholder='hey...'  onChange={(Event)=>{
       setcurrentmessage(Event.target.value)
     }}/>
        <button onClick={sendmessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat
