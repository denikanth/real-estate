import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
const SignUp = () => {

	const [formdata, setFormdata] = useState({})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const navigate=useNavigate()
	const handlechange = (e) => {
		setFormdata({
			...formdata,
			[e.target.id]: e.target.value
		})
	}
	//console.log(formdata)
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			setLoading(true)
			const res = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formdata)
			})
			const data = await res.json()
			console.log(data)
			if (data.success === false) {
				setError(data.message)
				setLoading(false)
				return
			}
			setLoading(false)
			setError(null)
			navigate('/sign-in')
			

		} catch (err) {
			console.log(err)
			setLoading(false)
			setError(err.message)
		}

	}
	return (
		<div className='flex items-center justify-center flex-col
    gap-4 pt-6 '>

			<h1 className='text-3xl font-semibold mb-3'>Sign Up</h1>
			<div className='w-[300px] sm:w-[480px]'>
				<form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
					<input onChange={handlechange} className='p-3 rounded-lg border bg-gray-300' type="text" placeholder='Username'
						name='username' id='username' />
					<input onChange={handlechange} className='p-3 rounded-lg border bg-gray-300 ' type="email" placeholder='Email'
						name='email' id='email' />
					<input onChange={handlechange} className='p-3 rounded-lg border bg-gray-300' type="password" placeholder='Password'
						name='password' id='password' />
					<button disabled={loading} className='bg-[#4285F4] text-white p-3 rounded-lg hover:opacity-95
         			outline-none disabled:opacity-80' >{loading ? 'loading..' : 'SIGNUP'}</button>
					<button className='bg-[#DB4437] text-white p-3 rounded-lg
        				 hover:opacity-95 disabled:opacity-95'>CONTINUE WITH GOOGLE</button>
				</form>
			</div>
			<p className='mt-1 text-[16px] font-semibold'> Have an Account?
				<Link to='/sign-in'>
					<span className='text-blue-600 cursor-pointer'> sign in</span>
				</Link>
			</p>
			{error && <p className='text-red-600 '>{'try using different emails or username'}</p>}
		</div>
	)
}

export default SignUp
