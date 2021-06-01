import {useState, useEffect} from 'react';
import mySocket from './socket';

function App() {
  const [messages, setMessages] = useState([]);

  const recCallback = (response) => {
    const {message} = JSON.parse(response.data);
    setMessages([message, ...messages]);
  } 

  const sendMessage = () => {
    fetch('http://127.0.0.1:8000/api/message/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({message: 'This is a message from websocket'})
    })
    .then((response) => {
      if(response.status === 200){
        return response.json();
      }else{
        return Promise.reject(response.json());
      }
    })
    .catch(() => {console.log('error');})
  }

  useEffect(() => {
    // Inital socket
    mySocket.initial('ws://127.0.0.1:8000/ws/chat/myRoom/', false);
    mySocket.addRecCallback(recCallback);
    // Close socket when leave the page
    return () => {
      mySocket.close();
    }
  })
  
  return (
    <div className="App">
      <h1>This is websocket chat room</h1>
      {messages.map((val, index) => {
        return (
          <div key={index}>
            {val}
          </div>
        )
      })}
      <button onClick={sendMessage}>Send a message</button>
    </div>
  
  );
}

export default App;
