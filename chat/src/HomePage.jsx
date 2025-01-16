import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import { userService } from './user.service.local'
import MessageInput from './cmps/MessageInput'

 //* Connect to the backend server
const socket = io('http://localhost:5000')

const App = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const chatWindowRef = useRef(null)

  const loggedinUser = userService.getLoggedinUser()

  useEffect(() => {
    if (!loggedinUser) {
      alert('You need to log in to access the chat!')
      window.location.href = '/login' 
    }
  }, [loggedinUser])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    return () => {
      socket.off('message')
    }
  }, [])

  const handleSendMessage = () => {
    if (message.trim() && loggedinUser) {
      const messageObject = {
        user: loggedinUser.fullname,
        imgUrl: loggedinUser.imgUrl,
        text: message,
        timestamp: new Date().toISOString(),
      }
      socket.emit('message', messageObject) 
      setMessage('')
    }
  }

  // Send message on Enter key press
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage()
    }
  }

  useEffect(() => {
    //* Scroll chat window to the bottom when new messages come in
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="app">
      <div className="chat-window" ref={chatWindowRef}>
        {messages.map((msg, index) => (
          <div key={index}  className={`message ${msg.user === loggedinUser.fullname ? 'sent' : 'received'}`}>
            <img src={msg.imgUrl} alt="User" className="user-img" />
            <div className="message-content">
              <div className="message-header">
                <strong>{msg.user}</strong>
                <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="message-text">{msg.text}</div>
            </div>
          </div>
        ))}
      </div>

      <MessageInput 
        message={message} 
        setMessage={setMessage} 
        handleSendMessage={handleSendMessage} 
        handleKeyDown={handleKeyDown} 
      />
    </div>
  )
}

export default App
