// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDE1uuEEY_d2idcPArakXZ2Kk1YGeC0PiY",
    authDomain: "netflixgpt-6e371.firebaseapp.com",
    projectId: "netflixgpt-6e371",
    storageBucket: "netflixgpt-6e371.firebasestorage.app",
    messagingSenderId: "133691390774",
    appId: "1:133691390774:web:33f63509f6d415ef9f5197",
    measurementId: "G-T3GQF1THYX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();