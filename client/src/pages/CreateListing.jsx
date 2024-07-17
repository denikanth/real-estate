import React from 'react'

const CreateListing = () => {
	return (
		<main className='p-3 max-w-4xl mx-auto '>
			<h1 className='text-center text-3xl font-bold my-8'>Create Listing</h1>
			<form className='flex flex-col sm:flex-row gap-3  '>

				<div className='flex flex-col gap-4 flex-1'>
					<input className='p-3  bg-gray-300 border border-gray-400 rounded-lg ' type="text" id='name' placeholder='Name'
						maxLength='62' minLength='10' required />
					<textarea className='p-3  bg-gray-300 border border-gray-400 rounded-lg resize-none' type="text" id='description' placeholder='Description'
						required   maxLength='600'/>
					<input className='p-3  bg-gray-300 border border-gray-400 rounded-lg' type="text" id='address' placeholder='Address'
						required />
					<div className='flex gap-3 flex-wrap'>
						<div className='flex items-center gap-2 '>
							<input type="checkbox" id='sale' className='w-5 h-5' />
							<span className='text-xl'>sell</span>
						</div>
						<div className='flex items-center gap-2 '>
							<input type="checkbox" id='rent' className='w-5 h-5' />
							<span className='text-xl'>Rent</span>
						</div>
						<div className='flex items-center gap-2 '>
							<input type="checkbox" id='parking' className='w-5 h-5' />
							<span className='text-xl'>Parking spot</span>
						</div>
						<div className='flex items-center gap-2 '>
							<input type="checkbox" id='furnished' className='w-5 h-5' />
							<span className='text-xl'>Furnished</span>
						</div>
						<div className='flex items-center gap-2 '>
							<input type="checkbox" id='offer' className='w-5 h-5' />
							<span className='text-xl'>offer</span>
						</div>
					</div>

					<div className='flex gap-3 flex-wrap '>
						<div className='flex gap-3 items-center '>
							<input type="number" className='bg-gray-300 p-3 
								rounded-lg border border-gray-400' min='1' max='10' id='bedrooms'
								required />
							<span>Beds</span>
						</div>
						<div className='flex gap-3 items-center '>
							<input type="number" required className='bg-gray-300 p-3 
								rounded-lg border border-gray-400' min='1' max='10' id='bathrooms' />
							<span>Baths</span>
						</div>
						<div className='flex gap-3 items-center '>
							<input type="number" required className='bg-gray-300 p-3 
								rounded-lg border border-gray-400' min='1' max='100000000' id='regularPrice'  />
							<div className='flex flex-col '>
								<span>Regular Price</span>
								<p className='text-xs'>(₹/month)</p>
							</div>
						</div>
						<div className='flex gap-3 items-center '>
							<input type="number" required className='bg-gray-300 p-3 
								rounded-lg border border-gray-400' min='1' max='100000000' id='discountPrice'  />
							<div className='flex flex-col '>
								<span>Discounted Price</span>
								<p className='text-xs'>(₹/month)</p>
							</div>
						</div>


					</div>
				</div>
				<div className='flex flex-1 flex-col gap-4 ' >
					<div className='flex gap-1'>
						<p className='font-semibold'>Images:</p>
						<span className='text-gray-600'>The first image will be the cover image (max 6)</span>
					</div>
					<div className='flex gap-2'>
						<input id='images' type="file" className='p-3 border border-gray-400 rounded' accept='image/*' required />
						<span  className='bg-white border border-green-500 px-4 py-4 rounded uppercase text-green-500 cursor-pointer' >Upload</span>
					</div>
					<button className='bg-green-700 text-center p-3 rounded-lg uppercase text-white hover:opacity-95'>create Listing</button>
					
				</div>

			</form>
		</main>
	)
}

export default CreateListing
