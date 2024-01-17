import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {


  const [formData, setFormData] = useState({username: "",email: "",password: "",});
  const [error, setError] = useState(null);
  const [load, setLoad] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoad(true);
      // Fetch returns a promise, so use async/await to wait for the response
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const  data = await response.json()
      console.log(`Here is the data ${data}`)
      if (data.success == false){
        setError(true)
        setLoad(false);
        return
      } else if (data.success == true){
        setError(false)
        return
      }
      setFormData({
        username: "",
        email: "",
        password: "",
      });

      setLoad(false);

    } catch (error) {
      setError(error.message);
      console.log(`Here is the error brother ${error.message}`);
      setLoad(false);
    }
  };

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

        <h1 className="bg-red-100 text-center">{error && "Email or name is already used "}</h1>

        <button
          type="button"
          onClick={handleSubmit}
          className="text-white bg-gradient-to-br from-red-800 to-blue-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-16 py-2 text-center me-2 mb-20 mt-10"
        >
          {load ? "Loading..." : "Sign Up"}
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
