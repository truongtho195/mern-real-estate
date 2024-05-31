import { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import imgBackground from "../../assets/images/bg.png"
import apiRequest from '../../lib/apiRequest.js';
import bg from './../../assets/images/bg.png'
import  {AuthContext} from './../../context/AuthContext.jsx';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./AddPostPage.css"

const AddPostPage = () => {
    const [error, setError] = useState("");
    const [isLoading,setIsLoading] = useState(false)
    const [value, setValue] = useState('');

    const navigate = useNavigate();
    const {currentUser,updateUser} = useContext(AuthContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        const formData  = new FormData(e.target);
        const inputs = Object.fromEntries(formData);
        console.log(inputs);
        try {
            const res = await apiRequest.post(`/posts`,{
                postData:{
                    title: inputs.title,
                    price: parseInt(inputs.price),
                    address: inputs.address,
                    city: inputs.city,
                    bedroom: parseInt(inputs.bedroom),
                    bathroom: parseInt(inputs.bathroom),
                    type: inputs.type,
                    property: inputs.property,
                    latitude: inputs.latitude,
                    longitude: inputs.longitude,
                    // images: images,
                },
                postDetail:{
                    desc: value,
                    utilities: inputs.utilities,
                    pet: inputs.pet,
                    income: inputs.income,
                    size: parseInt(inputs.size),
                    school: parseInt(inputs.school),
                    bus: parseInt(inputs.bus),
                    restaurant: parseInt(inputs.restaurant),
                }
            });
            console.log(res);
            navigate("/"+res.data._id)
            // updateUser(res.data)
            // navigate("/profile")
        } catch (err) {
            console.log(err)   
            setError(err.message)
        }finally{
            setIsLoading(false)
        }
    };
    return (
        currentUser && (  
        <div className="addPostPage">
            <div className="formContainer">
            <h1>Add New Post Page</h1>
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="item">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" name="title" />
                        </div>                        
                        <div className="item">
                            <label htmlFor="price">Price</label>
                            <input type="number" id="price" name="price" />
                        </div>
                        <div className="item">
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" name="address" />
                        </div>
                        <div className="item description">
                            <label htmlFor="description">Description</label>
                            <ReactQuill theme="snow" value={value} onChange={setValue} />
                        </div>
                        <div className="item">
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" name="city" />
                        </div>  
                        <div className="item">
                            <label htmlFor="bedroom">Bedroom Number</label>
                            <input type="number" min={1} id="bedroom" name="bedroom" />
                        </div>             
                        <div className="item">
                            <label htmlFor="bathroom">Bathroom Number</label>
                            <input type="number" min={1} id="bathroom " name="bathroom" />
                        </div>        
                        <div className="item">
                            <label htmlFor="latitude">Latitude</label>
                            <input type="text" id="latitude" name="latitude" />
                        </div>
                        <div className="item">
                            <label htmlFor="longitude">Longitude</label>
                            <input type="text" id="longitude" name="longitude" />
                        </div>    
                        <div className="item">
                            <label htmlFor="type">Type</label>
                            <select name="type" id="">
                                <option value="rent" defaultChecked>Rent</option>
                                <option value="buy">Buy</option>
                            </select>
                        </div>   
                        <div className="item">
                            <label htmlFor="property">Property</label>
                            <select name="property" id="">
                                <option value="apartment" defaultChecked>Apartment</option>
                                <option value="house">House</option>
                                <option value="condo">Condo</option>
                                <option value="land">Land</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="utilities">Utilities Policy</label>
                            <select name="utilities">
                                <option value="owner">Owner is responsible</option>
                                <option value="tenant">Tenant is responsible</option>
                                <option value="shared">Shared</option>
                            </select>
                        </div>     
                        <div className="item">
                            <label htmlFor="pet">Pet Policy</label>
                            <select name="pet">
                                <option value="allowed">Allowed</option>
                                <option value="not-allowed">Not Allowed</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="income">Income Policy</label>
                            <input
                                id="income"
                                name="income"
                                type="text"
                                placeholder="Income Policy"
                            />
                        </div> 
                        <div className="item">
                            <label htmlFor="size">Total Size (sqft)</label>
                            <input min={0} id="size" name="size" type="number" />
                        </div>
                        <div className="item">
                            <label htmlFor="school">School</label>
                            <input min={0} id="school" name="school" type="number" /> 
                        </div>             
                        <div className="item">
                            <label htmlFor="bus">Bus</label>
                            <input min={0} id="bus" name="bus" type="number" />
                        </div> 
                        <div className="item">
                            <label htmlFor="restaurant">Restaurant</label>
                            <input min={0} id="restaurant" name="restaurant" type="number" />
                        </div> 
                        <button className='btnAddPost' disabled={isLoading} >Add</button>
                        {error && <span className='errorMsg'>{error}</span>}
                        
                    </form>
                </div>
            </div>
            <div className="imgContainer">
                <img src={imgBackground} alt="" />
            </div>
        </div>)
    )
}

export default AddPostPage
