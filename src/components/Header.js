import React, { useEffect } from 'react'
import { auth } from '../utils/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants'
import { toggleGptSearchView } from '../utils/GptSlice'
import { changeLanguage } from '../utils/configSlice'



const Header = () => {
    const user = useSelector(store => store.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignOut = () => {
        signOut(auth).then(() => {

        }).catch((error) => {
            navigate('/error')

        })
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                navigate('/browse')

            }
            else {
                dispatch(removeUser());
                navigate('/')


            }
        });

        return () => unsubscribe();

    }, []);

    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView());

    }

    const handleLanguageChange = (e) => {
        // console.log(e.target.value);
        dispatch(changeLanguage(e.target.value))


    }

    const showGptSearch = useSelector((store) => store.gpt.showGptSearch)



    return (
        <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
            <img className='w-44' src={LOGO} alt='logo' />
            {user && (<div className='flex p-4'>
                {showGptSearch && <select className='p-2 bg-gray-900 text-white m-2' onChange={handleLanguageChange}>
                    {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifer} value={lang.identifer}>{lang.name}</option>)}

                </select>}

                <button type="" className='py-2 px-4 mr-2 mb-2 text-white  bg-purple-800 rounded-lg' onClick={handleGptSearchClick}>{showGptSearch ? "Home Page" : "GPT Search"}</button>
                <img className='w-9 h-9' alt='user Icon' src={user?.photoURL} />
                <button onClick={handleSignOut} className='font-bold text-white' type="">Sign Out</button>
            </div>)}
        </div>
    )
}

export default Header