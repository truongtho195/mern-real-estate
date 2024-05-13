import {useContext,useState} from 'react'
import "./ProfilePage.css"
import { useNavigate } from 'react-router-dom';
import { userData,listData } from "../../lib/dummydata.js";
import CardItem from '../../components/cardItem/CardItem.jsx'
import Chat from "../../components/chat/Chat.jsx";
import apiRequest from './../../lib/apiRequest.js';
import  AuthContext from './../../context/AuthContext.jsx';
function ProfilePage  () {
  const [error,setError] = useState("");
  const [updateUser] = useContext(AuthContext);
  const navigate = useNavigate();
    
  const user = userData;
  const logoutHandle= async ()=>{
    try {
      setError("");
      localStorage.removeItem("user");
      
      const res =  await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/")
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }
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
            <button className='btnLogout' onClick={logoutHandle}>Logout</button>
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
