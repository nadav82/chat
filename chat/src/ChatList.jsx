// src/components/ChatList.js
import React from 'react';

const ChatList = ({ chats, onSelectChat }) => {
  return (
    <div className="chat-list">
      {chats.map((chat, index) => (
        <div key={index} onClick={() => onSelectChat(chat)}>
          {chat.name}
        </div>
      ))}
    </div>
  );
};

export default ChatList;