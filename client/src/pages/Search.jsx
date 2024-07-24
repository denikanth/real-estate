import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
const Search = () => {
	return (
		<main className='flex flex-col w-full sm:flex-row  '>
			<div className='h-[100vh] flex-[32%] shadow-xl  p-8 sm:sticky left-0 top-0 '>
				<form className='flex flex-col gap-6 max-w-[400px]  '>
					<p className='flex items-center gap-2 font-semibold '>
						SearchTerm: <input id='searchTerm' placeholder='Search...' type="text" className='p-3 w-full  border border-gray-300 rounded-lg' />
					</p>
					<div className='flex gap-2  items-center flex-wrap' >
						<p className='font-semibold'>Type:</p>
						<input type="checkbox" id='all' className='w-[20px] h-[20px]' />
						<p>Rent & sale</p>
						<input type="checkbox" id='rent' className='w-[20px] h-[20px]' />
						<p >Rent</p>
						<input type="checkbox" id='sale' className='w-[20px] h-[20px]' />
						<p>Sale</p>
						<input type="checkbox" id='offer' className='w-[20px] h-[20px]' />
						<p>Offer</p>
					</div>
					<div className='flex gap-2  items-center flex-wrap' >
						<p className='font-semibold'>Ambients:</p>
						<input type="checkbox" id='parking' className='w-[20px] h-[20px]' />
						<p>Parking</p>
						<input type="checkbox" id='parking'  className='w-[20px] h-[20px]' />
						<p>Furnished</p>

					</div>

					<div className='flex gap-2 items-center '>
						<span className='font-semibold'>Sort:</span>
						<select  id="sort_order" className='p-3 border border-gray-300 rounded-lg' >
							<option value="">Price High to low</option>
							<option value="">Price low to high</option>
							<option selected value="">latest</option>
							<option  value="">oldest</option>
						</select>
					</div>
					<button className='p-3 rounded-lg text-white bg-yellow-600 uppercase font-semibold'>Search</button>
				</form>
			</div>
			<div className='flex flex-col flex-[68%] p-6  '>
				<h1 className='text-3xl my-4 font-semibold'>Listing Results:</h1>
				<hr className='h-[2px] w-[95%] bg-gray-300' />
				<div className='flex gap-4  flex-wrap mt-8 pl-1'>

					<div className='w-[350px]  h-[410px] rounded-lg bg-slate-200 shadow-md '>

						<img src="https://plus.unsplash.com/premium_photo-1661962841993-99a07c27c9f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2V8ZW58MHx8MHx8fDA%3D"
							alt="" className='w-full h-[55%] rounded-t-lg' />

						<div className='flex flex-col gap-2 my-2 p-3 '>
							<h1 className='font-semibold text-lg'>Place Name</h1>
							<span className='text-gray-600 text-[12px] flex gap-1 items-center'>
								<FaMapMarkerAlt className='text-green-600' /> adresss name</span>
							<span className='text-gray-600  text-[12px] flex overflow-clip h-[40px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sit odit iusto commodi harum pariatur eos eaque vel, molestiae provident, culpa nam. Fuga cupiditate consequuntur mollitia cumque, quisquam fugiat excepturi.</span>
						</div>
					</div>
					<div className='w-[350px]  h-[410px] rounded-lg bg-slate-200 shadow-md '>

						<img src="https://plus.unsplash.com/premium_photo-1661962841993-99a07c27c9f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2V8ZW58MHx8MHx8fDA%3D"
							alt="" className='w-full h-[55%] rounded-t-lg' />

						<div className='flex flex-col gap-2 my-2 p-3 '>
							<h1 className='font-semibold text-lg'>Place Name</h1>
							<span className='text-gray-600 text-[12px] flex gap-1 items-center'>
								<FaMapMarkerAlt className='text-green-600' /> adresss name</span>
							<span className='text-gray-600  text-[12px] flex overflow-clip h-[40px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sit odit iusto commodi harum pariatur eos eaque vel, molestiae provident, culpa nam. Fuga cupiditate consequuntur mollitia cumque, quisquam fugiat excepturi.</span>
						</div>
					</div>
					<div className='w-[350px]  h-[410px] rounded-lg bg-slate-200 shadow-md '>

						<img src="https://plus.unsplash.com/premium_photo-1661962841993-99a07c27c9f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2V8ZW58MHx8MHx8fDA%3D"
							alt="" className='w-full h-[55%] rounded-t-lg' />

						<div className='flex flex-col gap-2 my-2 p-3 '>
							<h1 className='font-semibold text-lg'>Place Name</h1>
							<span className='text-gray-600 text-[12px] flex gap-1 items-center'>
								<FaMapMarkerAlt className='text-green-600' /> adresss name</span>
							<span className='text-gray-600  text-[12px] flex overflow-clip h-[40px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sit odit iusto commodi harum pariatur eos eaque vel, molestiae provident, culpa nam. Fuga cupiditate consequuntur mollitia cumque, quisquam fugiat excepturi.</span>
						</div>
					</div>


				</div>

			</div>
		</main>
	)
}

export default Search
