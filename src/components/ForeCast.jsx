import React from 'react'

const ForeCast = ({data}) => {

    const dailyForecast = data.reduce((acc, item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString("en-GB");
        if(!acc.find(f => f.date === date)) {
            acc.push({
                temperature: `${item.main.temp}°C`,
                day: new Date(item.dt * 1000).toLocaleDateString("em-EN", {weekday: 'short'}),
                date: date,
                icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
            })
        }
        return acc;
    }, []).slice(0, 5)

    const hourlyForecast =data.slice(0, 5).map(item => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        degree: `${item.main.temp}°C`,
        windSpeed: `${item.wind.speed}`
    }))

    return (
        <div className='flex'>
            <div className='xl:w-96 w-full h-auto px-4 py-4 bg-secondary shadow-2xl shadow-black m-4 mt-8 rounded-lg text-white'>
                <h2 className='flex items-center justify-center font-bold text-2xl'>5 Days Forecast</h2>
                {dailyForecast.map((cast, i) => (
                    <div key={i} className='flex flex-row justify-between items-center'>
                        <img src={cast.icon} alt="icon" className='select-none h-16 w-16' />
                        <p className='font-bold items-center'> {cast.temp} </p>
                        <p className='font-bold'> {cast.day}, {cast.date} </p>
                    </div>
                ))}
            </div>

            <div className='flex-grow h-auto p-4 bg-secondary shadow-2xl shadow-black m-4 mt-8 rounded-lg text-white hidden lg:block'>
                <h1 className='text-2xl font-bold mb-4 flex items-center justify-center'>Hourly Forecast</h1>
                <div className='flex justify-around items-center gap-4 h-54 mt-6'>
                    {hourlyForecast.map((cast, i) => (
                        <div key={i} className='flex flex-col items-center gap-2 bg-green-600 rounded-lg p-4 w-28 text-center shadow-md shadow-black'>
                            <p className='text-sm font-medium'>{cast.time}</p>
                            <img src={cast.icon} alt="icon" className='select-none' />
                            <p>{cast.degree}</p>
                            <p>{cast.windSpeed} km/h</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ForeCast