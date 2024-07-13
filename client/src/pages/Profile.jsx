import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Profile = () => {
  const {loading,error}=useSelector((state)=>state.user)
  const {currentUser}=useSelector((state)=>state.user)
  return (

    <div className='flex items-center justify-center flex-col
    gap-4 pt-6 '>

      <h1 className='text-3xl font-semibold mb-3'>Profile</h1>
      <img src={currentUser.avatar} className='rounded-full 
          object-cover h-24 w-24'  alt="" />
      <div className='w-[300px] sm:w-[480px]'>
        <form  className='flex flex-col gap-4 '>
          <input className='p-3 rounded-lg border bg-gray-300 ' placeholder='username'
            name='username' id='username' />
          <input  className='p-3 rounded-lg border bg-gray-300' type="email" placeholder='email'
            name='email' id='email' />
          <input  className='p-3 rounded-lg border bg-gray-300' type="password" placeholder='password'
            name='password' id='password' />
          <button disabled={loading} className='bg-[#4285F4] text-white p-3 rounded-lg hover:opacity-95
         			outline-none disabled:opacity-80' >{loading ? 'loading..' : 'Update'}</button>
          <button disabled={loading} className='bg-[#0b870fb1] text-white p-3 rounded-lg hover:opacity-95
         			outline-none disabled:opacity-80' >{loading ? 'loading..' : 'Create Listing'}</button>
          
        </form>
        <div className='flex justify-between mt-4'>

          <p className='text-red-700 cursor-pointer'>Delete Account</p>
          <p className='text-red-700 cursor-pointer'>Sign out</p>
        </div>
      </div>
      
      {error && <p className='text-red-600 '>{error}</p>}
    </div>
  )
}

export default Profile
