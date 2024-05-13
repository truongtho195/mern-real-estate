import React, { useContext } from 'react'
import bg from '../assets/images/bg.png'
import SearchBar from '../../components/searchBar/SearchBar'
import "./homePage.css"
import { AuthContext } from '../../context/AuthContext'
export default function HomePage() {
    const {currentUser} = useContext(AuthContext);
    return (
        <div className='flex check-responsive'>
            <div className='text-container lg:basis-2/3'>
                <div className='wrapper lg:pr-[100px] flex flex-col lg:justify-center gap-12 h-screen md:pr-1 justify-start'>
                    <h1 className='title text-4xl font-semibold lg:text-2xl '>
                        Find Real Estate & Get Your Dream Place</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis error quae, inventore quaerat repudiandae quo commodi quisquam maxime, eius sint qui ex sequi culpa expedita molestiae corporis accusantium vitae at.</p>
                    <SearchBar />
                    <div className='boxes text-xl font-semibold justify-between hidden'>
                        <div className='box'>
                            <h1>16+</h1>
                            <h2>Years of Experience</h2>
                        </div>
                        <div className='box'>
                            <h1>200</h1>
                            <h2>Award Gained</h2>
                        </div>
                        <div className='box'>
                            <h1>2000+</h1>
                            <h2>Property Ready</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className='md:flex lg:basis-1/3 bg-[#fcf5f3] relative align-middle justify-center '>
                <div className='w-[110%] absolute right-0 '>
                    <img src={bg} alt="" className='absolute w-[150%] right-0' />
                </div>
            </div>
        </div>
    )
}
