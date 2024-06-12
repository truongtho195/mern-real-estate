import { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import imgBackground from "../../assets/images/bg.png"
import apiRequest from '../../lib/apiRequest.js';
import bg from './../../assets/images/bg.png'
import AvatarUpload from '../../components/avatarUpload/AvatarUpload.jsx';
import  {AuthContext} from './../../context/AuthContext.jsx';
import "./ProfileUpdatePage.css"

const ProfileUpdatePage = () => {
    const [error, setError] = useState("");
    const [isLoading,setIsLoading] = useState(false)
    const [avatar, setAvatar] = useState(null);


    const navigate = useNavigate();
    const {currentUser,updateUser} = useContext(AuthContext);


    const handleFileSelect = (file) => {
        console.log(file)
        setAvatar(file);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        const formData  = new FormData(e.target);
        // const username = formData.get("username");
        // const email = formData.get("email");
        // const password = formData.get("password");
        try {
            if(avatar)
                formData.append('avatar',avatar)
                        
            const updateData= Object.fromEntries(formData);
            console.log(updateData)

            
            const res = await apiRequest.put(`/users/${currentUser._id}`,
                formData
            );
            
            updateUser(res.data)
            navigate("/profile")
        } catch (err) {
            console.log(err)   
            setError(err.message)
        }finally{
            setIsLoading(false)
        }
    };
    return (
        currentUser && (   <div className="profileUpdate">
        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <h1>Update profile</h1>
                <input type="text" className="username" name="username" placeholder='Username' defaultValue={currentUser.username} />
                <input type="text" className="email" name="email" placeholder='Email' defaultValue={currentUser.email} />
                <input type="password" className="password" name='password' placeholder='Password' />
                <button disabled={isLoading} >Update</button>
                {error && <span className='errorMsg'>{error}</span>}
                
            </form>
        </div>
        <div className="imgContainer">
            {/* <img src={imgBackground} alt="" /> */}
            <AvatarUpload onFileSelect={handleFileSelect}/>
        </div>
    </div>)
    )
}

export default ProfileUpdatePage
