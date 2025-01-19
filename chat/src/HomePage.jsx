// App.jsx
import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import { userService } from './user.service.local'
import MessageInput from './cmps/MessageInput'
import UserList from './cmps/UserList'
import { useSelector } from 'react-redux'
import { useLoginModal } from '../src/hooks/useLoginModal'
import { useNavigate } from 'react-router-dom'
import { debounce } from 'lodash'

const socket = io('http://localhost:5000')

function HomePage() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [typingUsers, setTypingUsers] = useState([])
  const [privateChat, setPrivateChat] = useState(null)

  const chatWindowRef = useRef(null)
  const loggedinUser = userService.getLoggedinUser()
  const users = useSelector((storeState) => storeState.userModule.user)

  const { LoginModal, openLoginModal } = useLoginModal()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedinUser) {
      openLoginModal()
      navigate('/login')
    }
  }, [loggedinUser, openLoginModal, navigate])

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

    socket.on('private_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    socket.on('update_online_users', (users) => {
      setOnlineUsers(users)
    })

    socket.on('typing', (user) => {
      setTypingUsers((prev) => (!prev.includes(user) ? [...prev, user] : prev))
    })

    socket.on('stop_typing', (user) => {
      setTypingUsers((prev) => prev.filter((u) => u !== user))
    })

    return () => {
      socket.off('message')
      socket.off('private_message')
      socket.off('update_online_users')
      socket.off('typing')
      socket.off('stop_typing')
    }
  }, [])

  function handleSendMessage() {
    if (message.trim()) {
      const messageObject = {
        user: loggedinUser.fullname,
        imgUrl: loggedinUser.imgUrl,
        text: message,
        timestamp: new Date().toISOString(),
        toUser: privateChat || null,
      }

      if (privateChat) {
        socket.emit('private_message', messageObject)
      } else {
        socket.emit('message', messageObject)
      }

      setMessage('')
      socket.emit('stop_typing', loggedinUser.fullname)
    }
  }

  const debouncedTyping = useRef(
    debounce(() => {
      socket.emit('typing', loggedinUser.fullname)
    }, 300)
  ).current

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSendMessage()
    } else {
      debouncedTyping()
    }
  }

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight
    }
  }, [messages])

  return (
    <>
      <LoginModal />
      <div className="app">
        <div className="sidebar">
          <UserList
            users={users}
            onlineUsers={onlineUsers}
            loggedinUser={loggedinUser}
            setPrivateChat={setPrivateChat}
          />
        </div>
        <div className="chat-window" ref={chatWindowRef}>
          {messages
            .filter((msg) =>
              privateChat
                ? (msg.user === loggedinUser.fullname && msg.toUser === privateChat) ||
                  (msg.user === privateChat && msg.toUser === loggedinUser.fullname)
                : !msg.toUser
            )
            .map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.user === loggedinUser.fullname ? 'sent' : 'received'}`}
              >
                <img src={msg.imgUrl} alt="User" className="user-img" />
                <div className="message-content">
                  <div className="message-header">
                    <strong>{msg.user}</strong>
                    <span className="timestamp">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="message-text">{msg.text}</div>
                </div>
              </div>
            ))}
          {typingUsers.length > 0 && (
            <div className="typing-indicator">
              {typingUsers.join(', ')} typing...
            </div>
          )}
        </div>
        <MessageInput
          message={message}t
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          handleKeyDown={handleKeyDown}
          onBlur={() => socket.emit('stop_typing', loggedinUser.fullname)}
        />
      </div>
    </>
  )
}

export default HomePage