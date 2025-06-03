import React, { useEffect, useState } from 'react'
import Clock from './Clock'
import { GiSunrise, GiSunset } from "react-icons/gi"; 
import { MdOutlineWaves } from "react-icons/md";
import { PiWindFill } from "react-icons/pi";
import { VscCompass } from "react-icons/vsc";
import { GiLouvrePyramid } from "react-icons/gi";
import ForeCast from './ForeCast';
import { toast } from 'react-toastify';
import axios from 'axios';

const CityAndTime = ({
    cityName,
    lat,
    long,
    setLat,
    setLong,
}) => {

    const [weatherData, setWeatherData] = useState(null)
    const [forecastData, setForecastData] = useState(null)
    const [uvIndex, setUvIndex] = useState(null)

    const fetchData = async(lat, long) => {
        try {
            const encodedCity = encodeURIComponent(cityName)
            let url;

            if(encodedCity) {
                url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=metric&&appid=4c6df96cb77d926d0da7d5c7d70ee4ab`
            }else if(lat && long) {
                url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&&appid=4c6df96cb77d926d0da7d5c7d70ee4ab`
            }else {
                toast.error("Missing city name or coordinates")
            }

            const currentWeather = await axios.get(url)
            setWeatherData(currentWeather.data);

            const {coord} = currentWeather.data
            setLat(coord.lat) 
            setLong(coord.lon)

            const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&units=metric&&appid=4c6df96cb77d926d0da7d5c7d70ee4ab`)
            setForecastData(forecast.data)

            const uv = await axios.get(`https://api.openweathermap.org/data/2.5/uvi?lat=${coord.lat}&lon=${coord.lon}&appid=4c6df96cb77d926d0da7d5c7d70ee4ab`)
            setUvIndex(uv.data.value)

        } catch (error) {
            toast.error("Missing city name or coordinates")
            console.log("failed to fetch due to:", error);
        }
    }

    useEffect(() => {
        if(!cityName && (!lat || !long)) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const {longitude, latitude} = pos.coords
                    setLat(latitude)
                    setLong(longitude)
                    fetchData(latitude, longitude)
                },
                (error) => {
                    console.log("Geolocation error:", error);
                    toast.error("Location access denied. Please enter a city name manually.")
                }
            )
        }else {
            fetchData(lat, long)
        }
    }, [cityName, lat, long])

    if(!weatherData || !forecastData) {
        return <div className='flex justify-center items-center text-accent text-2xl md:text-4xl'>Loading...</div>
    }

    const {main, weather, sys, wind} = weatherData
    const {list} = forecastData

    const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

    return (
    <>
        <div className='flex flex-col xl:flex-row gap-4 mt-8'>
            {/* Left-sec City and time */}
            <div className='w-full xl:w-1/3 h-auto md:h-72 bg-secondary shadow-2xl shadow-black rounded-lg text-accent p-4 flex flex-col gap-4 justify-between items-center' >
                <h1 className='text-2xl md:text-3xl font-bold'>{cityName || weatherData.name}</h1>
                <img src={weatherIconUrl} alt="weathericon" className='w-24 select-none'/>

                <Clock />
            </div>

            {/* Right-sec weather details */}
            <div className='h-auto md:h-72 rounded-lg bg-secondary shadow-2xl shadow-black flex flex-col justify-around p-4 flex-grow text-accent md:flex-row items-center md:items-stretch gap-4'>
                {/* Temp. Sunrise and sunset */}
                <div className='flex flex-col items-center justify-between xl:jutify-center gap-6 md:gap-4'>
                    <h1 className='text-2xl md:text-4xl font-bold'>{main.temp}&#8451;</h1>
                    <p className='text-center'>
                        Feels Like: <span className='text-lg md:text-xl ml-2 font-bold'>{main.feels_like}&#8451;</span>
                    </p>
                    <div className='flex xl:flex-col md:flex-row items-center gap-4'>
                        <div className='flex items-center gap-2'>
                            <GiSunrise className='text-2xl md:text-4xl select-none'/>
                            <div className='text-center'>
                                <h6>Sunrise</h6>
                                <p>{new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <GiSunset className='text-2xl md:text-4xl select-none'/>
                            <div className='text-center'>
                                <h6>Sunset</h6>
                                <p>{new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* main weather icon */}
                <div className='flex flex-col jutify-center items-center '>
                    <img src={weatherIconUrl} alt="sun" className='w-42 md:w-52 select-none' />
                    <p className='font-bol text-xl md:text-3xl'>{[weather[0].description]}</p>
                </div>
                {/* Additional weeather information */}
                <div className='md:grid md:grid-cols-2 flex flex-row justify-between gap-4 md:p-4'>
                    <div className='flex flex-col items-center gap-2'>
                        <MdOutlineWaves className='text-2xl md:text-4xl select-none' />
                        <p>{main.humidity}%</p>
                        <h6>Humidity</h6>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                        <PiWindFill className='text-2xl md:text-4xl select-none' />
                        <p>{wind.speed} km/h</p>
                        <h6>Wind Speed</h6>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                        <VscCompass className='text-2xl md:text-4xl select-none' />
                        <p>{main.pressure}hPa</p>
                        <h6>pressure</h6>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                        <GiLouvrePyramid className='text-2xl md:text-4xl select-none' />
                        <p>{uvIndex !== null ? uvIndex : "N/A"}</p>
                        <h6>UV</h6>
                    </div>
                    
                </div>
            </div>
        </div>

        <ForeCast data={list} />
    </>
    )
}

export default CityAndTime