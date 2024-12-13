import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';

const Login = () => {
    const dispatch = useDispatch();
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);

    }
    const handleButtonClick = () => {
        //validate the form data
        const message = checkValidData(email.current.value, password.current.value);
        // console.log(email.current.value);
        // console.log(password.current.value);
        // console.log(message);
        setErrorMessage(message);

        if (message) return;
        //create user
        if (!isSignInForm) {
            //signup logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {

                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: USER_AVATAR
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                    })
                    console.log(user);



                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage)
                });

        }
        else {
            //signin logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {

                    // const user = userCredential.user;
                    // console.log(user);

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage)
                });
        }

    }

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    return (
        <div>
            <Header />
            <div className='absolute'>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/ce449112-3294-449a-b8d3-c4e1fdd7cff5/web/IN-en-20241202-TRIFECTA-perspective_0acfb303-6291-4ad1-806f-dda785f6295a_small.jpg" alt="logo" />

            </div>
            <form onSubmit={(e) => e.preventDefault()} className='absolute my-36 mx-auto bg-black right-0 left-0 p-12 w-3/12 text-white rounded-lg bg-opacity-80'>
                <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && <input ref={name} type='text' placeholder='FullName' className='p-4 my-4 w-full bg-gray-700' />}

                <input ref={email} type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700' />

                <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700' />
                <p className='text-red-700 font-bold text-lg py-2'>{errorMessage}</p>
                <button type="" className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}</p>

            </form>

        </div>
    )
}

export default Login