import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import {signinStart,signinSuccess,signFailure} from '../redux/user/userSlice.js'
import Oauth from '../components/Oauth.jsx'
const SignIn = () => {
  const [formdata, setFormdata] = useState({})
  const {loading,error}=useSelector((state)=>state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			dispatch(signinStart())
			const res = await fetch('/api/auth/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formdata)
			})
			const data = await res.json()
			console.log(data)
			if (data.success === false) {
				dispatch(signFailure(data.message))
				
				return
			}
			
			dispatch(signinSuccess(data))
			navigate('/')
			

		} catch (err) {
			console.log(err)
			dispatch(signFailure(err.message))
		}

	}
  return (
    <div className='flex items-center justify-center flex-col
    gap-4 pt-6 '>

      <h1 className='text-3xl font-semibold mb-3'>Sign in</h1>
      <div className='w-[300px] sm:w-[480px]'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>

          <input onChange={handlechange} className='p-3 rounded-lg border bg-gray-300 ' type="email" placeholder='Email'
            name='email' id='email' />
          <input onChange={handlechange} className='p-3 rounded-lg border bg-gray-300' type="password" placeholder='Password'
            name='password' id='password' />
          <button disabled={loading} className='bg-[#4285F4] text-white p-3 rounded-lg hover:opacity-95
         			outline-none disabled:opacity-80' >{loading ? 'loading..' : 'SIGN IN'}</button>
          <Oauth/>
        </form>
      </div>
      <p className='mt-1 text-[16px] font-semibold'> Dont Have an Account?
        <Link to='/sign-up'>
          <span className='text-blue-600 cursor-pointer'> sign up</span>
        </Link>
      </p>
      {error && <p className='text-red-600 '>{error}</p>}
    </div>
  )
}

export default SignIn
