// pages/index.js
import { useState, useEffect } from 'react';
import { useSocket } from '../contexts/socketContext';

export default function Home() {
  const socket = useSocket(); // Get the socket from context
  const [message, setMessage] = useState(''); // The current message to send
  const [messages, setMessages] = useState([]); // List of received messages

  // Log when the socket connects and when a message is received
  useEffect(() => {
    console.log("Application booting up...");
    if (!socket) {
      console.log("Socket not available yet.");
      return;
    }

    console.log('Client socket connected:', socket.id);

    // Log and update message list when receiving messages from the server
    socket.on('message', (msg) => {
      console.log('Message received from server:', msg);
      setMessages((prev) => [...prev, msg]);
    });

    // Clean up on component unmount
    return () => {
      console.log('Cleaning up socket event listeners.');
      socket.off('message');
    };
  }, [socket]);

  // Function to send message to the server via Socket.io
  const sendMessage = () => {
    console.log('Sending message:', message); // Log the message before sending
    if (socket && message.trim()) {
      console.log('Sending message:', message); // Log the message before sending
      socket.emit('message', message); // Emit the message to the server
      setMessage(''); // Clear the input field
    } else {
      console.log('Socket not connected or message is empty.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Socket.io with Next.js and Docker</h1>
      <div>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Update the message state
          onKeyPress={(e) => (e.key === 'Enter' ? sendMessage() : null)} // Allow pressing Enter to send
        />
        <button onClick={sendMessage}>Send</button> {/* Send message on button click */}
      </div>
      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li> // Display received messages
        ))}
      </ul>
    </div>
  );
}