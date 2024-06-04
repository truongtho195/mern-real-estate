import {useState} from 'react'
import imgSearch from "../../assets/images/search.png"
import { useSearchParams } from 'react-router-dom'
import "./Filter.css"
const Filter = () => {
    
    const [searchParams,setSearchParams] = useSearchParams();
    console.log(`Type: ${searchParams.get("type") }`)
    const [query,setQuery]= useState({
        type:searchParams.get("type") || "any",   
        city:searchParams.get("city") || "",
        property:searchParams.get("property") || "",
        minPrice:searchParams.get("minPrice") || 0,
        maxPrice:searchParams.get("maxPrice") || 1000000,
        bedroom:searchParams.get("bedroom") || 1,
    })
    
const handleChange =e =>{
    setQuery({
        ...query,
        [e.target.name]:e.target.value
    })
}

    return (
        <div className='filter'>
            <h1>Search result for <b>{query.city}</b></h1>
            <div className="top">
                <div className="item">
                    <label htmlFor="city">Location</label>
                    <input type="text" placeholder="Filter by City" defaultValue={query.city} onChange={handleChange}/>
                </div>
                
            </div>
            <div className="bottom">
                <div className="item">
                    <label htmlFor="city">Type</label>
                    <select name="type" id="type" onChange={handleChange} defaultValue={query.type}>
                        <option value="any">any</option>
                        <option value="buy">Buy</option>
                        <option value="rent">Rent</option>
                    </select>
                </div>
                <div className="item">
                    <label htmlFor="property">Property</label>
                    <select name="property" id="property"  defaultValue={query.property}> 
                        <option value="any">any</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="condo">Condo</option>
                        <option value="land">Land</option>
                    </select>
                </div>
                <div className="item">
                    <label htmlFor="minPrice">Min Price</label>
                    <input type="number"  placeholder="Any" onChange={handleChange} defaultValue={query.minPrice}/>
                </div>
                <div className="item">
                    <label htmlFor="maxPrice">Max Price</label>
                    <input type="number" placeholder="Any" onChange={handleChange} defaultValue={query.maxPrice}/>
                </div>
                <div className="item">
                    <label htmlFor="bedroom">Bedroom</label>
                    <input type="text" placeholder="Any" onChange={handleChange} defaultValue={query.bedroom}/>
                </div>
                <div className="item">
                    <button className=''>
                        <img src={imgSearch} alt="" className='' />
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default Filter
