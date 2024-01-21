import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function NavBar() {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <nav className='bg-gray-600'>
      <div className='flex justify-between items-center max-w-7xl mx-auto p-5'>
        <Link to="/">
          <h2 className='font-bold '>BookSphere</h2>
        </Link>

        <ul className='flex gap-10 cursor-pointer '>
          <Link to="/feed">
            <li>Feed</li>
          </Link>

          <Link to="/about">
            <li>About</li>
          </Link>

          <Link to='/profile'>
            {currentUser ? (
              <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
            ) : (
              <li>Sign In</li>
            )}
          </Link>

          
        </ul>

      </div>
    </nav>
  )
}
