import React from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate  } from "react-router-dom";

export default function GAuth() {
  const dispatch = useDispatch(); // Move this line outside of handleGoogleAuth
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      

      try {
          const res = await fetch('http://localhost:3000/api/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({
              "name": result.user.displayName,
              "email": result.user.email,
              "photo": result.user.photoURL
            }),
          });

        
        const data = await res.json();
        dispatch(signInSuccess(data));
        navigate('/')


      } catch (error) {
        console.log("Can't fetch data")
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleAuth}
        type="button"
        className='text-white bg-gradient-to-br from-gray-800 to-yellow-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-16 py-2 text-center me-2 mt-28'
      >
        Join with Google
      </button>
    </div>
  );
}
