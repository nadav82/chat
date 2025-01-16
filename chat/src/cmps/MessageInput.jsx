import React from 'react';

const MessageInput = ({ message, setMessage, handleSendMessage, handleKeyDown }) => {
  return (
    <div className="message-input">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
      ></textarea>
      <button className="send-button" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
};

export default MessageInput;
