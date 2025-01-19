import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadUsers } from '../store/user.actions' 

function UserList({ onlineUsers, loggedinUser, setPrivateChat }) {
  const users = useSelector((storeState) => storeState.userModule.users)
  const dispatch = useDispatch()

  function handleUserClick(user) {
    if (user.fullname !== loggedinUser.fullname) {
      setPrivateChat(user.fullname)
    }
  }

  useEffect(() => {
    (loadUsers())
  }, [])

  return (
    <div className="user-list">
      <h3>All Users</h3>
      <strong>{loggedinUser.fullname}</strong>
  <ul>
    {Array.isArray(users) && users.length > 0 ? (
      users.map((user, index) => (
        <li key={index} onClick={() => handleUserClick(user)} className="user-item">
          <img src={user.imgUrl} alt="User" className="user-img" />
          <div className="user-info">
            <strong>{user.fullname}</strong>
            {onlineUsers.includes(user.fullname) && <span className="status"> (Online)</span>}
          </div>
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
