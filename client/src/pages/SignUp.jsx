import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col items-center justify-center">
        <form className="flex flex-col gap-8 p-6 w-2/3 ">
          <input
            className="text-center placeholder:text-center focus:text-center rounded-lg bg-slate-300 h-8"
            placeholder="username"
            id="username"
          />

          <input
            className="text-center placeholder:text-center focus:text-center rounded-lg bg-slate-300 h-8"
            placeholder="email"
            id="email"
          />

          <input
            className="text-center placeholder:text-center focus:text-center rounded-lg bg-slate-300 h-8"
            type="password"
            placeholder="password"
            id="password"
          />
        </form>

        <button
          type="button"
          className="text-white bg-gradient-to-br from-red-800 to-blue-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-16 py-2 text-center me-2 mb-20 mt-10"
        >
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
