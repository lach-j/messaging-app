import './App.css';
import { io } from 'socket.io-client';
import React, { useState, useEffect } from 'react';
function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    console.log(newSocket);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
  return (
    <div className="App">
      <header className="app-header">React Chat</header>
      {socket ? (
        <>
          <div className="chat-container">connected</div>
          <button
            onClick={(e) => {
              console.log(socket.emit('custom_event', { payload: 'hello' }));
            }}
          >
            SEND MSG
          </button>
        </>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

export default App;
