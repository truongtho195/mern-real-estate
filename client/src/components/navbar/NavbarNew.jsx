import React, { useState } from 'react';

const NavbarNew = () => {
    const [isOpen, setIsOpen] = useState(false); // State để kiểm soát việc hiển thị của menu

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <img src="your-logo-url.png" alt="Logo" className="mr-3 w-10" />
                    <span className="font-semibold text-xl">Bee Estate</span>
                </div>
                <button
                    className="sm:hidden block hamburger"
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
                <div
                    className={`${isOpen ? 'flex' : 'hidden'
                        } flex-col items-center self-end py-8 mt-10 space-y-6 font-medium bg-gray-800 top-0 w-full transition-all duration-500 absolute`}
                >
                    <a href="/" className="hover:bg-gray-700 px-3 py-2 rounded-md">
                        Home
                    </a>
                    <a href="/" className="hover:bg-gray-700 px-3 py-2 rounded-md">
                        About
                    </a>
                    <a href="/" className="hover:bg-gray-700 px-3 py-2 rounded-md">
                        Contact
                    </a>
                    <a href="/" className="hover:bg-gray-700 px-3 py-2 rounded-md">
                        Agents
                    </a>
                    <a href="/" className="hover:bg-gray-700 px-3 py-2 rounded-md">
                        Sign In
                    </a>
                    <a href="/" className="hover:bg-gray-700 px-3 py-2 rounded-md">
                        Sign out
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default NavbarNew;
