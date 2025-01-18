import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import { userService } from './user.service.local'
import MessageInput from './cmps/MessageInput'
import UserList from './cmps/UserList'
import { useSelector } from 'react-redux'

// Connect to the backend server
const socket = io('http://localhost:5000')

const App = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([]) 
  const chatWindowRef = useRef(null)
  const [privateChat, setPrivateChat] = useState(null)
  const loggedinUser = userService.getLoggedinUser()
  const users = useSelector((storeState) => storeState.userModule.user)
  const [typingUsers, setTypingUsers] = useState([]) 

  useEffect(() => {
    if (!loggedinUser) { 
      alert('You need to log in to access the chat!')
      window.location.href = '/login' 
    }
  }, [loggedinUser, users])
  
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || []
    setMessages(savedMessages)
  
    socket.on('message', (message) => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, message]
        localStorage.setItem('messages', JSON.stringify(updatedMessages))
        return updatedMessages
      })
    })
  
    return () => {
      socket.off('message')
    }
  }, [])
  
  useEffect(() => {
    socket.on('online_users', (loggedInUsers) => {
      setOnlineUsers(loggedInUsers)
    })
  
    return () => {
      socket.off('online_users')
    }
  }, [])

useEffect(() => {
  socket.on('typing', (user) => {
    console.log('Typing event received:', user)
    setTypingUsers((prevTypingUsers) => [...prevTypingUsers, user])
  })

  socket.on('stop_typing', (user) => {
    console.log('Stop typing event received:', user)
    setTypingUsers((prevTypingUsers) => prevTypingUsers.filter((u) => u !== user))
  })

  return () => {
    socket.off('typing')
    socket.off('stop_typing')
  }
}, [])
  
  
  const handleSendMessage = () => {
    if (message.trim()) {
      const messageObject = {
        user: loggedinUser.fullname,
        imgUrl: loggedinUser.imgUrl,
        text: message,
        timestamp: new Date().toISOString(),
      }
  
      socket.emit('message', messageObject)
      // Emit the message to the server (for both private and public chats)
      // if (privateChat) {
      //   socket.emit('privateMessage', { toUser: privateChat, message: messageObject })
      // } else {
      //   socket.emit('message', messageObject)
      // }
  
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, messageObject]
        localStorage.setItem('messages', JSON.stringify(updatedMessages)) 
        return updatedMessages
      })
  
      setMessage('') 
      socket.emit('stop_typing', loggedinUser.fullname) 

    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage()
    } else {
      socket.emit('typing', loggedinUser.fullname)
    }
  }

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="app">
      {/* <div className="sidebar"> */}
        <div className="loggedin-user">
          {/* <img src={users.imgUrl} alt="User" className="user-img" /> */}
          {/* <strong>{loggedinUser.fullname}</strong> */}
        </div>
        {/* <UserList 
          users={users} 
          onlineUsers={onlineUsers} 
          loggedinUser={loggedinUser} 
          setPrivateChat={setPrivateChat} 
        />
      </div> */}
      <div className="chat-window" ref={chatWindowRef}>
        {messages
          .filter((msg) => (privateChat ? msg.user === privateChat : true))
          .map((msg, index) => (
            <div key={index} className={`message ${msg.user === loggedinUser.fullname ? 'sent' : 'received'}`}>
              <img src={loggedinUser.imgUrl} alt="User" className="user-img" />
              <div className="message-content">
                <div className="message-header">
                  <strong>{msg.user}</strong>
                  <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="message-text">{msg.text}</div>
              </div>
            </div>
          ))}
           {typingUsers.map((user, index) => (
          <div key={index} className="typing-indicator">
            {user} is typing...
          </div>
        ))}
      </div>
      <MessageInput 
        message={message} 
        setMessage={setMessage} 
        handleSendMessage={handleSendMessage} 
        handleKeyDown={handleKeyDown} 
        onBlur={() => socket.emit('stop_typing', loggedinUser.fullname)}
      />
    </div>
  )
}

export default App
