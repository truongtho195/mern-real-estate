import React, { useState } from 'react'
import imgSearch from "../../assets/images/search.png"
import { Link } from 'react-router-dom';

function SearchBar() {
    const types = ["buy", "rent"];
    const [query, setQuery] = useState({
        type: "buy",
        location: "",
        minPrice: 0,
        maxPrice: 0,
    });
    const switchType = (val) => {
        setQuery((prev) => ({ ...prev, type: val }));
    };
    const handleChange = e =>{
        console.log(`${e.target.name} | ${e.target.value}`)
        setQuery((prev)=>({...prev,[e.target.name]:e.target.value}));
    }

    const callAction =()=>{
        const link= `/list?type =${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`;
        console.log(link);
        console.log(query);
    }
    return (
        <div className='flex flex-col'>
            <div className='type lg:pb-0 pb-2'>
                {
                    types.map((item) => (
                        <button key={item}
                            onClick={() => { switchType(item) }}
                            className={`
                            first:rounded-tl-lg first:border-r-0 
                            last:rounded-tr-lg last:border-l-0 
                            px-8 py-4 cursor-pointer uppercase
                            border-[1px] 
                            lg:border-b-0 
                            lg:border-black
                            border-gray-500
                            sm:border-solid
                            ${query.type == item ? 'bg-black text-white' : 'bg-white text-black'}`}>
                            {item}
                        </button>
                    ))
                }
            </div>
            <form className='border
                            lg:border-solid 
                            border-none
                            border-black 
                            flex 
                            lg:flex-row
                            flex-col
                            justify-between
                            h-[64px]
                            gap-4
                            md:h-auto'>
                <input type="text" 
                        name='city' 
                        placeholder='City ' 
                        className='form-input' onChange={handleChange}/>
                <input type="number" 
                        name='minPrice' 
                        placeholder='Min Price' 
                        className='form-input ' onChange={handleChange} />
                <input type="text" 
                        name='maxPrice' 
                        min={0} 
                        max={1000000} 
                        placeholder='Max Price' 
                        className='form-input' onChange={handleChange}/>
                <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`} className='btn'>
                    <button 
                        className='border-0 bg-yellow-400 cursor-pointer p-4 flex item bg-center justify-center'>
                        <img src={imgSearch} alt="" className='w-5 h-5 justify-center' />
                    </button>
                </Link>
            </form>
        </div>
    )
}

export default SearchBar
