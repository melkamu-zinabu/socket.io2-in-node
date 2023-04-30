
import { useState } from 'react';
import './App.css';
import io, { Socket } from 'socket.io-client'
import Chat from './Chat';
const socket=io.connect('http://localhost:3001');
function App() {
  const [username ,setusername]= useState('')
  const [room ,setroom]= useState('')
  const [showchat ,setshowchat]= useState(false)
  //write the remaining code in the render part
 // if it is true only chat window if it is false only join achat 
  //execute when we click a button
  const joinroom=()=>{
    //do validation
    if(username !==''&& room !==""){
      socket.emit('join_room',room)
      setshowchat(true)
    }

  }
  return (
    
    <div className="App">
      
     { !showchat ?
      <div className='joinChatContainer '>
     <h3>Join Chat</h3>
     {/* //inputs one for user name and  for the room. inorder to have achat b/n two peopple they need to be the same room
     wait in the next the real ones*/}
     <input type='text' placeholder='john...'
      onChange={(Event)=>{
       setusername(Event.target.value)
     }}/>
     <input type='text' placeholder='room id'  onChange={(Event)=>{
       setroom(Event.target.value)
     }}/>
     <button onClick={joinroom}>join a room</button>
     </div>
    :
    /* to pass data to the chat component as props */
     <Chat socket={socket} username={username} room={room}/>
    }
    </div>
  );
}

export default App;
