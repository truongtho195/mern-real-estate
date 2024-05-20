import { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import imgBackground from "../../assets/images/bg.png"
import apiRequest from '../../lib/apiRequest.js';
import "./loginPage.css"
import { AuthContext } from '../../context/AuthContext.jsx';
function loginPage() {
    const [error, setError] = useState("");
    const [isLoading,setIsLoading] = useState(false)
    const {updateUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("")
        const formData = new FormData(e.target);
        const username = formData.get("username");
        const password = formData.get("password");
        
        try {
            const res = await apiRequest.post("/auth/login", {
                username, 
                password
            });
            
            updateUser(res.data)
            navigate("/profile")
        } catch (err) {
            //err.response.data.message
            // console.log(err);
            const errMsg =  err.response.data.message || err.message;
            // console.log(errMsg);
            setError(errMsg);
        }finally{
            setIsLoading(false);
        }
    };
    return (
        <div className="login">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Welcome Back</h1>
                    <input type="text" className="username" name="username" placeholder='Username' required minLength={3} maxLength={20} />
                    <input type="password" className="password" name='password' placeholder='Password' required />
                    <button  disabled={isLoading}>Login</button>
                    {error && <span className='errorMsg'>{error}</span>}
                    <Link className='link' to="/register">Do you have an account?</Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src={imgBackground} alt="" />
            </div>
        </div>
    )
}

export default loginPage
