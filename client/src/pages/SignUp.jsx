import React, { useState } from "react";
import { Link } from 'react-router-dom'

export default function SignUp() {
  const [formData, setFormData] = useState({
    "username": "",
    "email": "",
    "password": "",
  });
  


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/auth/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  
  };
  

  


  console.log(formData)


  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col items-center justify-center">
        <form className="flex flex-col gap-8 p-6 w-2/3 ">

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

        <button 
          type="button" 
          onClick={handleSubmit}
          className="text-white bg-gradient-to-br from-red-800 to-blue-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-16 py-2 text-center me-2 mb-20 mt-10">
            Sign Up
        </button>

        <div className="flex justify-center gap-5">
          <p>You have an account ?</p>
          <Link to="/sign-in">
            <span className="text-blue-900">Sign In</span>
          </Link>
        </div>

      </div>
      

      <div className="flex-1 opacity-95">
        <img
          className="rounded"
          src="https://wallpaperaccess.com/full/7002101.jpg"
          alt="app"
          height={"100%"}
          width={"100%"}
        />
      </div>
    </div>
  );
}
