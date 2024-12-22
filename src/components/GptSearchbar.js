import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useSelector } from 'react-redux'
import openai from '../utils/openai'

const GptSearchbar = () => {
    // const handleGptSearchClick = async () => {
    //     // console.log(searchText.current.value);

    //     const gptQuery = "Act as a Movie recommendation system and suggest some movies for the movie : " + searchText.current.value + ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmal, Koi Mil Gaya"
    //     const gptResults = await openai.chat.completions.create({
    //         messages: [{ role: 'user', content: gptQuery }],
    //         model: 'gpt-3.5-turbo'
    //     });
    //     console.log(gptResults.choices);

    // }
    const searchText = useRef();
    const langKey = useSelector(store => store.config.lang)
    return (
        <div className='pt-[10%] flex justify-center'>
            <form className=' bg-black w-1/2 grid grid-cols-12 rounded-lg' onSubmit={(e) => { e.preventDefault() }}>
                <input ref={searchText} type='text' placeholder={lang[langKey].gptSearchPlaceholder} className='p-4 m-4 rounded-lg col-span-9' />
                <button className='py-2 px-4 col-span-3 m-4 bg-red-700 text-white rounded-lg'>{lang[langKey].search}</button>
            </form>
        </div>
    )
}

export default GptSearchbar 