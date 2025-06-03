"use client"

import React, { useEffect, useState } from 'react'

const Clock = () => {

    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
            const timer = setInterval(() => {
                setCurrentTime(new Date())
            }, 1000)

            return () => clearInterval(timer)
    })

    return (
        <div>
            <h1 className='text-2xl md:text-4xl font-bold'> {new Date().toLocaleTimeString()} </h1>
            <h1 className='text-sm md:text-md font-medium'> {new Date().toLocaleDateString()} </h1>
        </div>
    )
}

export default Clock