import React from 'react'
import "./ProfilePage.css"
import { userData } from "../../lib/dummydata.js";
import CardItem from '../../components/cardItem/CardItem.jsx'
import { listData } from "../../lib/dummydata.js"
import Chat from "../../components/chat/Chat.jsx";
const ProfilePage = () => {
  const user = userData;
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>Avatar : <img src={user.img} alt="" /></span>
            <span>Username : <b>{user.name}</b></span>
            <span>Email : <b>{user.email}</b></span>
          </div>

          <div className="title">
            <h1>My List</h1>
            <button>Add New Post</button>
          </div>
          <div className="list">
            {
              listData.map(item => (
                <CardItem key={item.id} item={item} />
              ))
            }
          </div>

        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
