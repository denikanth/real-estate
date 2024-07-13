import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Header = () => {
	const {currentUser}=useSelector((state)=>state.user)
	return (
		<header className='bg-[#8697c4] shadow-md '>
			<div className='flex justify-between items-center max-w-6xl p-3 mx-auto '>
				<Link to='/'>
					<h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
						<span className='text-slate-500'>Deni</span>
						<span className='text-slate-700'>Estate</span>
					</h1>
				</Link>

				<form className='bg-[#dbdee7e9] p-2 rounded-lg flex justify-between items-center gap-2' >

					<input type="text" placeholder='Search..' className='bg-transparent focus:outline-none
                w-24 sm:w-64 ' />
					<FaSearch className='text-slate-600 cursor-pointer' />
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
						:(<li className='cursor-pointer font-[480] '>SignIn</li>)}
						
					</Link>
				</ul>
			</div>
		</header>
	)
}

export default Header
