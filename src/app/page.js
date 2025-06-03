"use client"

import CityAndTime from '@/components/CityAndTime'
import Navbar from '@/components/Navbar'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'

import "react-toastify/dist/ReactToastify.css"

const page = () => {

  const [cityName, setCityName] = useState("")
  const [lat, setLat] = useState(null)
  const [long, setLong] = useState(null)

  const handleCitySearch = (city) => {
    setCityName(city) 
    setLat(null)
    setLong(null)
  }

  const handleLocationFetch = (latitude, longitude) => {
    setLat(latitude)
    setLong(longitude)
    setCityName("")
  }

  return (
    <div className='container mx-auto'>
      <ToastContainer />
      <div className='w-full h-full'>
      <Navbar onCityFetch={handleCitySearch} onLocationFetch={handleLocationFetch} />
      </div>

      <div>
      <CityAndTime cityName={cityName} lat={lat} long={long} setLat={setLat} setLong={setLong}/>
      </div>
    </div>
  )
}

export default page