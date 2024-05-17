import { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import imgBackground from "../../assets/images/bg.png"
import apiRequest from '../../lib/apiRequest.js';
import bg from './../../assets/images/bg.png'
import  {AuthContext} from './../../context/AuthContext.jsx';
import "./ProfileUpdatePage.css"

const ProfileUpdatePage = () => {
    const [error, setError] = useState("");
    const [isLoading,setIsLoading] = useState(false)
    const {updateUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        const formData  = new FormData(e.target);
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");
        try {
            const res = await apiRequest.post("/auth/register",{
                username,email,password
            });

            navigate("/login")
        } catch (err) {
            console.log(err)   
            setError(err.response.data.message)
        }finally{
            setIsLoading(false)
        }
    };
    return (
        currentUser && (   <div className="register">
        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <h1>Create an Accounts</h1>
                <input type="text" className="username" name="username" placeholder='Username' defaultValue={currentUser.username} />
                <input type="text" className="email" name="email" placeholder='Email' defaultValue={currentUser.email} />
                <input type="password" className="password" name='password' placeholder='Password' />
                <button disabled={isLoading} >Update</button>
                {error && <span className='errorMsg'>{error}</span>}
                
            </form>
        </div>
        <div className="imgContainer">
            <img src={imgBackground} alt="" />
        </div>
    </div>)
    )
}

export default ProfileUpdatePage
