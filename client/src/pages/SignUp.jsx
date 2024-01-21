import React, { useState } from "react";
import { Link , useNavigate  } from "react-router-dom";
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice';
import GAuth from "../component/GAuth";
import { useDispatch, useSelector } from 'react-redux'




export default function SignUp() {

  const [formData, setFormData] = useState({"username": "","email": "","password": "",});

  const {load , error } = useSelector((state) => state.user)
  const dispatch =  useDispatch();
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch returns a promise, so use async/await to wait for the response
      dispatch(signInStart())
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json()
      alert('done')
      console.log(data)

      if (data._id){
        dispatch(signInSuccess(data))
        navigate('/')
      } else{
        dispatch(signInFailure(data.error))
      }


    } catch (error) {
      alert("the catch running ")
      alert(error)
      dispatch(signInFailure(error))
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col items-center ">
        <h1 className="text-center text-gray-900  text-2xl  mt-32">Sign Up</h1>
        <form className="flex flex-col gap-8 p-6 w-2/3 mt-20 ">
          <input
            className="text-center placeholder:text-center focus:text-center rounded-lg bg-slate-300 h-8"
            placeholder="username"
            id="username"
            name="username" // Add name attribute
            onChange={handleChange}
          />

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

        <h1 className="bg-red-100 text-center">{error && "Email or name is already used "}</h1>

        <button
          type="button"
          onClick={handleSubmit}
          className="text-white bg-gradient-to-br from-red-800 to-blue-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-16 py-2 text-center me-2 mb-5  mt-10"
        >
          {load ? "Loading..." : "Sign Up"}
        </button>


        <div className="flex justify-center gap-5">
          <p>You have an account ?</p>
          <Link to="/sign-in">
            <span className="text-blue-900">Sign In</span>
          </Link>
        </div>

        <GAuth />
      </div>

      <div className="flex-1 opacity-95">
        <img
          className="rounded"
          src="https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?cs=srgb&dl=pexels-ricky-esquivel-1907785.jpg&fm=jpg"
          alt="app"
          height={"100%"}
          width={"100%"}
        />
      </div>
    </div>
  );
}
