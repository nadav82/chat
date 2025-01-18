import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const UserList = ({ onlineUsers, loggedinUser, setPrivateChat }) => {
  const users = useSelector((storeState) => storeState.userModule.user)
  // console.log(users)

  const handleUserClick = (user) => {
    if (user.fullname !== loggedinUser.fullname) {
      setPrivateChat(user.fullname) 
    }
  }

  return (
    <div className="user-list">
      <h3>All Users</h3>
      <ul>
        {/* Check if users is an array before mapping */}
        {Array.isArray(users) ? (
          users.map((user, index) => (
            <li
              key={index}
              className={onlineUsers.includes(user.fullname) ? 'online' : 'offline'}
              onClick={() => handleUserClick(user)}
            >
              <img src={user.imgUrl} alt="User" className="user-img" />
              <strong>{user.fullname}</strong>
              {onlineUsers.includes(user.fullname) && <span className="status"> (Online)</span>}
            </li>
          ))
        ) : (
          <p>No users available</p>
        )}
      </ul>
    </div>
  )
}

export default UserList
