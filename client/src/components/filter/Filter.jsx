import React from 'react'
import imgSearch from "../../assets/images/search.png"
import "./Filter.css"
const Filter = () => {
  return (
    <div className='filter'>
        <h1>Search result for <b>London</b></h1>
        <div className="top">
            <div className="item">
                <label htmlFor="city">Location</label>
                <input type="text" placeholder="Filter by Location"/>
            </div>
            
        </div>
        <div className="bottom">
            <div className="item">
                <label htmlFor="city">Type</label>
                <select name="type" id="type">
                    <option value="any">any</option>
                    <option value="buy">Buy</option>
                    <option value="rent">Rent</option>
                </select>
            </div>
            <div className="item">
                <label htmlFor="property">Property</label>
                <select name="property" id="property">
                    <option value="any">any</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="land">Land</option>
                </select>
            </div>
            <div className="item">
                <label htmlFor="minPrice">Min Price</label>
                <input type="number"  placeholder="Any"/>
            </div>
            <div className="item">
                <label htmlFor="maxPrice">Max Price</label>
                <input type="number" placeholder="Any"/>
            </div>
            <div className="item">
                <label htmlFor="bedroom">Bedroom</label>
                <input type="text" placeholder="Any"/>
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
