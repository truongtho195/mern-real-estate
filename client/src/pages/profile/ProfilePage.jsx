import { useContext, useEffect, useState } from 'react'
import "./ProfilePage.css"
import { useNavigate, Link, useLoaderData, Await } from 'react-router-dom';
import { userData, listData } from "../../lib/dummydata.js";
import CardItem from '../../components/cardItem/CardItem.jsx'
import Chat from "../../components/chat/Chat.jsx";
import apiRequest from './../../lib/apiRequest.js';
import { AuthContext } from './../../context/AuthContext.jsx';
import imgNoAvatar from './../../assets/images/noavatar.jpg';
import { Suspense } from 'react'

function ProfilePage() {
  const data = useLoaderData();
  const [error, setError] = useState("");

  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const user = currentUser;

  useEffect(() => {
    if (!currentUser) {
      navigate("/login")
    }
  }, [user, navigate]);

  const logoutHandle = async () => {
    try {
      setError("");
      localStorage.removeItem("user");
      const res = await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/")
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  const gotoUpdateProfile = () => {
    navigate("/profile/update");
  }
  return (
    user && (<div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button onClick={gotoUpdateProfile}>Update Profile</button>
          </div>
          <div className="info">
            <span>Avatar : <img src={user.avatar || imgNoAvatar} alt="" /></span>
            <span>Username : <b>{user.username}</b></span>
            <span>Email : <b>{user.email}</b></span>
            <button className='btnLogout' onClick={logoutHandle}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/post/add">
              <button> Add New Post</button>
            </Link>
          </div>
          <div className="list">
            <Suspense fallback={<p>Loading ...</p>}>
              <Await
                resolve={data.postResponse}
                errorElement={
                  <p>Error loading package location!</p>
                }>
                {
                  (postResponse) =>
                    postResponse.data.userPosts.map(item => (
                      <CardItem key={item._id} item={item} />
                    ))
                }
              </Await>
            </Suspense>
            {/* {
              // listData.map(item => (
              //   <CardItem key={item.id} item={item} />
              // ))
            } */}
          </div>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <div className="list">
              <Suspense fallback={<p>Loading ...</p>}>
                <Await
                  resolve={data.postResponse}
                  errorElement={
                    <p>Error loading package location!</p>
                  }>
                  {
                    (postResponse) =>
                      postResponse.data.savedPost.map(item => (
                        <CardItem key={item._id} item={item} />
                      ))
                  }
                </Await>
              </Suspense>
            {/* {
              listData.map(item => (
                <CardItem key={item.id} item={item} />
              ))
            } */}
          </div>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Suspense fallback={<p>Loading ...</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={
                <p>Error loading package location!</p>
              }>
              {
                (chatResponse) => <Chat chats={chatResponse.data}/>                  
              }
            </Await>
          </Suspense>
        </div>
      </div>
    </div>)
  )
}
export default ProfilePage;

