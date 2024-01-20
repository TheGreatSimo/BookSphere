import React, { useState } from "react";
import { Link , useNavigate  } from "react-router-dom";
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux'



export default function SignIn() {
  const [formData, setFormData] = useState({"email": "","password": "",});
  const {load , error } = useSelector((state) => state.user)

  const dispatch =  useDispatch();
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      try{
        dispatch(signInStart())
      } catch(error) {
        alert(`error 2 ${error}`)
      }
      
      const response = await fetch("http://localhost:3000/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      });

      const  data = await response.json()
      console.log(data)

      if (data._id) {
        dispatch(signInSuccess(data))
        navigate('/')
      } else {
        dispatch(signInFailure(data.error))
      }

    } catch (error) {
      dispatch(signInFailure(error))
      console.log(`Here is the error brother ${error.message}`);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col items-center  ">
        <h1 className="text-center text-gray-900  text-2xl  mt-32">Sign in</h1>

        <form className="flex flex-col gap-8 p-6 w-2/3 mt-20">
          <input
            className="text-center placeholder:text-center focus:text-center rounded-lg bg-slate-300 h-8"
            placeholder="email"
            id="email"
            name="email"
            onChange={handleChange}
          />

          <input
            className="text-center placeholder:text-center focus:text-center rounded-lg bg-slate-300 h-8"
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
          />
        </form>


        {/* <h1 className="bg-red-100 text-center">{error && "Password or email is wrong "}</h1> */}
        <h1 className="bg-red-100 text-center">
          {error ? error || 'Something went wrong!' : ''}
        </h1>

        <button
          type="button"
          onClick={handleSubmit}
          className="text-white bg-gradient-to-br from-red-800 to-blue-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-16 py-2 text-center me-2 mb-20 mt-10"
        >
          {load ? "Loading..." : "Sign In"}
        </button>

        <div className="flex justify-center gap-5">
          <p>You do not have an account ?</p>
          <Link to="/sign-up">
            <span className="text-blue-900">Sign Up</span>
          </Link>
        </div>
      </div>

      <div className="flex-1 opacity-95">
        <img
          className="rounded"
          src="https://images.unsplash.com/photo-1651509585702-2905b72197de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGFsb3xlbnwwfDF8MHx8fDA%3D&w=1000&q=80"
          alt="app"
          height={"100%"}
          width={"100%"}
        />
      </div>
    </div>
  );
}
