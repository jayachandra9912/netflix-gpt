import React, { useEffect } from 'react'
import { auth } from '../utils/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO } from '../utils/constants'



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



    return (
        <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
            <img className='w-44' src={LOGO} alt='logo' />
            {user && (<div className='flex p-4'>
                <img className='w-9 h-9' alt='user Icon' src={user?.photoURL} />
                <button onClick={handleSignOut} className='font-bold text-white' type="">Sign Out</button>
            </div>)}
        </div>
    )
}

export default Header