"use client"

import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { toast } from 'react-toastify';

const Navbar = ({
    onCityFetch,
    onLocationFetch,
}) => {

    const [searchQuery, setSearchQuery] = useState("")

    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if(searchQuery) {
            onCityFetch(searchQuery) 
            setSearchQuery("")
        }
    }

    const handleLocationClick = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const {latitude , longitude} = pos.coords 
                onLocationFetch(latitude, longitude)
                setSearchQuery("")
            }, (error) => {
                console.log(error);
                toast.error("Geplocation is not supoorted by your browser")
            }
        )
        }
    }

    return (
        <div className='m-4'>
            <div className='flex gap-4 justify-between items-center lg:flex-row'>
                {/* Logo */}
                <img 
                    src="/weatherAppLogo.png" 
                    alt="logo" 
                    className='w-10 h-10 rounded-full select-none' 
                />

                <form onSubmit={handleSearchSubmit} className='relative flex justify-center items-center px-2 text-primary/80'>
                    <CiSearch className='absolute left-4 text-xl'/>
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={handleSearchQuery}
                        placeholder='Search for your city...'
                        className='outline-none bg-accent px-8 py-2 rounded-l-sm' 
                    />
                    <button 
                        className='bg-secondary text-accent px-4 py-2 rounded-e-sm hover:bg-accent/60 hover:text-primary transition-all duration-300 ease-in-out cursor-pointer'
                    >
                        Search
                    </button>
                </form>

                <div onClick={handleLocationClick} className='bg-secondary px-4 py-2 flex justify-center items-center gap-2 rounded-lg cursor-pointer'>
                    <FaLocationCrosshairs className='text-primary text-xl' />
                    <p className='text-accent text-sm' >Current Location</p>
                </div>
            </div>
        </div>
    )
}

export default Navbar