import React from 'react'

const VideoTitle = ({ title, overview }) => {
    return (
        <div className='w-screen aspect-video pt-[13%] px-14 absolute text-white bg-gradient-to-r from-black ' >
            <h1 className='text-3xl font-bold'>{title}</h1>
            <p className='py-5 text-lg w-3/6'>{overview}</p>
            <div className=''>
                <button className='bg-white text-black p-3 px-10 text-xl rounded-lg hover:bg-opacity-80'>▶Play</button>
                <button className='m-2 bg-gray-400 text-black p-3 px-10 text-xl bg-opacity-50 rounded-lg'>ℹ️More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle