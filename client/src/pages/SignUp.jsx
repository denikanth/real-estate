import React from 'react'
import { Link } from 'react-router-dom'
const SignUp = () => {
	return (
		<div className='flex items-center justify-center flex-col
    gap-4 pt-6 '>

			<h1 className='text-3xl font-semibold mb-3'>Sign Up</h1>
			<div className='w-[300px] sm:w-[480px]'>
				<form className='flex flex-col gap-4 '>
					<input className='p-3 rounded-lg border bg-gray-300' type="text" placeholder='Username'
						name='username' id='username' />
					<input className='p-3 rounded-lg border bg-gray-300 ' type="email" placeholder='Email'
						name='email' id='email' />
					<input className='p-3 rounded-lg border bg-gray-300' type="password" placeholder='Password'
						name='password' id='password' />
					<button className='bg-[#4285F4] text-white p-3 rounded-lg hover:opacity-95
         			outline-none disabled:opacity-80' >SIGNUP</button>
					<button className='bg-[#DB4437] text-white p-3 rounded-lg
        				 hover:opacity-95 disabled:opacity-95'>CONTINUE WITH GOOGLE</button>
				</form>
			</div>
			<p className='mt-1 text-[16px] font-normal'> Have an Account? 
				<Link to='/sign-in'>
					<span className='text-blue-600 cursor-pointer'> sign in</span>
				</Link>
			</p>

		</div>
	)
}

export default SignUp
