import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className='bg-gray-600'>
      <div className='flex justify-between items-center max-w-7xl mx-auto p-5'>
        <Link to="/">
          <h2 className='font-bold '>Auth App</h2>
        </Link>

        <ul className='flex gap-10 cursor-pointer '>
          <Link to="/about">
            <li>about</li>
          </Link>

          <Link to="/profile">
            <li>profile</li>
          </Link>

          <Link to="/sign-in">
            <li>Sign-In</li>
          </Link>

          <Link to="/sign-up">
            <li>Sign-Up</li>
          </Link>
          
        </ul>

      </div>
    </nav>
  )
}