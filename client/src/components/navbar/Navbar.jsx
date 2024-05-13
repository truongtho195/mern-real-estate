import { useContext, useState } from "react";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { userData } from "../../lib/dummydata.js";
import "./Navbar.css";
import { AuthContext } from "../../context/AuthContext.jsx";
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    // const [currentUser] = useContext(AuthContext)
    const user = userData;
    return (
        <nav>
            <div className="flex h-[60px]">
                <div className="basis-2/3 flex items-center space-x-4 ">
                    <a href="/" className="flex items-center space-x-2 ">
                        <img
                            src={Logo}
                            alt=""
                            className="w-[28px] h-[28px] font-bold text-2xl"
                        />
                        <span>Bee Estate</span>
                    </a>
                    <div className="hidden sm:flex items-center flex-grow gap-3 ">
                        <a href="/">Home</a>
                        <a href="/">About</a>
                        <a href="/">Contact</a>
                        <a href="/">Agents</a>
                    </div>
                </div>
                <div className="right">
                    {user ? (
                        <div className="user">
                            <img src={user.avatar} alt="" />
                            <span>{user.username}</span>
                            <Link className="linkUser" to="/profile">
                                <span className="notification"> 3</span>
                                Profile
                            </Link>

                        </div>
                    ) : (
                        <>
                            <div className="gap-10 hidden sm:flex items-center">
                                <a href="/">Sign in</a>
                                <a href="/" className="bg-orange-300 px-3 py-2">
                                    Sign up
                                </a>
                            </div>
                        </>
                    )}
                    <button
                        className="sm:hidden block hamburger z-[100] text-white bg-gray-800 p-2 rounded-full"
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                    {/* Responsive Menu Links
           */}
                    <div
                        className={`
                                    ${isOpen ? "flex visible" : "hidden"}
                                    flex flex-col 
                                    items-center 
                                    justify-center 
                                    align-middle 
                                    font-medium
                                    bg-gray-800
                                    text-white
                                    w-[50%]
                                    h-[100vh]
                                    top-0
                                    absolute
                                    transition-all 
                                    duration-500`}
                    >
                        <a
                            href="/"
                            className="block hover:bg-gray-700 px-3 py-2 rounded-md"
                        >
                            Home
                        </a>
                        <a
                            href="/"
                            className="block hover:bg-gray-700 px-3 py-2 rounded-md"
                        >
                            About
                        </a>
                        <a
                            href="/"
                            className="block hover:bg-gray-700 px-3 py-2 rounded-md"
                        >
                            Contact
                        </a>
                        <a
                            href="/"
                            className="block hover:bg-gray-700 px-3 py-2 rounded-md"
                        >
                            Agents
                        </a>
                        <a
                            href="/"
                            className="block hover:bg-gray-700 px-3 py-2 rounded-md"
                        >
                            Sign In
                        </a>
                        <a
                            href="/"
                            className="block hover:bg-gray-700 px-3 py-2 rounded-md"
                        >
                            Sign out
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
