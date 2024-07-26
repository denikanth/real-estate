import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
const Header = () => {
	const { currentUser } = useSelector((state) => state.user)
	const [searchTerm, setSearchTerm] = useState('')
	const navigate = useNavigate()
	const handleSubmit = async (e) => {
		e.preventDefault()
		const urlParams = new URLSearchParams(window.location.search);//this is useed to get the query params including ?
		urlParams.set('searchTerm', searchTerm)//this will create new query params named searchTerm if there is no in that or it will update it but it will not reflect in url bar untill we use navigate
		const searchQuery = urlParams.toString()//it will convert to string if any int type is found in params value
		console.log(urlParams);
		navigate(`/search?${searchQuery}`)


	}
	useEffect(() => {
		const urlParams = new URLSearchParams(location.search)
		const searchTermFromUrl = urlParams.get('searchTerm')//this will get the value of searchTerm query params
		console.log(searchTermFromUrl);
		if (searchTermFromUrl) {
			setSearchTerm(searchTermFromUrl)
		}

	}, [location.search])//location.search which is query params in url bar ,when it change then this useEffect will run

	return (
		<header className='bg-[#8697c4] shadow-lg  '>
			<div className='flex justify-between items-center max-w-6xl p-3 mx-auto '>
				<Link to='/'>
					<h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
						<span className='text-slate-500'>Luxury</span>
						<span className='text-slate-700'>Estate</span>
					</h1>
				</Link>

				<form onSubmit={handleSubmit} className='bg-[#dbdee7] p-2 rounded-lg flex justify-between items-center gap-2' >

					<input onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} type="text" placeholder='Search..' className='bg-transparent focus:outline-none
                w-24 sm:w-64 ' name='searchTerm' />
					<button >
						<FaSearch className='text-slate-600 cursor-pointer' />
					</button>

				</form>
				<ul className='flex gap-4'>
					<Link to='/'>
						<li className='cursor-pointer   font-[480] hidden sm:inline '>Home</li>
					</Link>
					<Link to='/about'>
						<li className='cursor-pointer  font-[480] hidden sm:inline'>About</li>
					</Link>
					<Link to='/profile'>
						{currentUser ? (<img src={currentUser.avatar} className='rounded-full w-7 h-7 object-cover' alt='avatar' />)
							: (<li className='cursor-pointer font-[480] '>SignIn</li>)}

					</Link>
				</ul>
			</div>
		</header>
	)
}

export default Header
