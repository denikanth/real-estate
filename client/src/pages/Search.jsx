import React, { useEffect, useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
const Search = () => {
	const navigate = useNavigate()
	const [sideBarData, setSideBarData] = useState({
		searhTerm: '',
		type: 'all',
		offer: false,
		parking: false,
		furnished: false,
		sort: 'created_at',
		order: 'desc'

	})
	const [listings, setListings] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const handleChange = (e) => {

		if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
			setSideBarData({
				...sideBarData,
				type: e.target.id
			})
		}
		if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
			setSideBarData({
				...sideBarData,
				[e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false //if i set offer value from url params this will be used 
			})
		}
		if (e.target.id === 'searchTerm') {
			setSideBarData({
				...sideBarData,
				[e.target.id]: e.target.value
			})
		}
		if (e.target.id === 'sort_order') {
			const sort = e.target.value.split('_')[0] || 'created_at'
			const order = e.target.value.split('_')[1] || 'desc'
			setSideBarData({
				...sideBarData,
				sort,
				order
			})
		}
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		const urlParams = new URLSearchParams()
		urlParams.set('searchTerm', sideBarData.searchTerm)
		urlParams.set('type', sideBarData.type)
		urlParams.set('offer', sideBarData.offer)
		urlParams.set('parking', sideBarData.parking)
		urlParams.set('furnished', sideBarData.furnished)
		urlParams.set('sort', sideBarData.sort)
		urlParams.set('order', sideBarData.order)
		const searchQuery = urlParams.toString()
		navigate(`/search?${searchQuery}`)
	}
	useEffect(() => {
		const urlParams = new URLSearchParams(location.search)
		const searchTermFromUrl = urlParams.get('searchTerm')
		const typeFromUrl = urlParams.get('type')
		const parkingFromUrl = urlParams.get('parking')
		const furnishedFromUrl = urlParams.get('furnished')
		const offerFromUrl = urlParams.get('offer')
		const sortFromUrl = urlParams.get('sort')
		const orderFromUrl = urlParams.get('order')

		if (
			searchTermFromUrl
			|| typeFromUrl || parkingFromUrl
			|| furnishedFromUrl || offerFromUrl
			|| sortFromUrl || orderFromUrl
		) {
			setSideBarData({
				searchTerm: searchTermFromUrl || '',
				offer: offerFromUrl === 'true' ? true : false,
				parking: parkingFromUrl === 'true' ? true : false,
				furnished: furnishedFromUrl === 'true' ? true : false,
				type: typeFromUrl || 'all',
				sort: sortFromUrl || 'created_at',
				order: orderFromUrl || 'desc'
			})
		}

		const fetchListings = async () => {

			try {
				setError(false)
				setLoading(true)
				setListings([])
				const searchQuery = urlParams.toString()
				const res = await fetch(`/api/listing/get?${searchQuery}`)
				const data = await res.json()
				if (data.success === false || data.length === 0) {
					setLoading(false)
					setError(true)
					console.log('in if');
					return
				}
				setListings(data)
				setLoading(false)
				setError(false)
			} catch (err) {
				console.log(err);
				setLoading(false)
				setError(true)
			}
		}
		fetchListings()
	}, [location.search])
	console.log(listings);
	console.log(error);
	return (
		<main className='flex flex-col w-full sm:flex-row  '>
			<div className='h-[100vh] flex-[32%] shadow-xl  p-8 sm:sticky left-0 top-0 '>
				<form onSubmit={handleSubmit} className='flex flex-col gap-6 max-w-[400px]  '>
					<p className='flex items-center gap-2 font-semibold '>
						SearchTerm: <input
							onChange={handleChange} value={sideBarData.searchTerm}
							id='searchTerm' placeholder='Search...' type="text" className='p-3 w-full  border border-gray-300 rounded-lg' />
					</p>
					<div className='flex gap-2  items-center flex-wrap' >
						<p className='font-semibold'>Type:</p>
						<input onChange={handleChange} checked={sideBarData.type === 'all'} type="checkbox" id='all' className='w-[20px] h-[20px]' />
						<p>Rent & sale</p>
						<input onChange={handleChange} checked={sideBarData.type === 'rent'} type="checkbox" id='rent' className='w-[20px] h-[20px]' />
						<p >Rent</p>
						<input onChange={handleChange} checked={sideBarData.type === 'sale'} type="checkbox" id='sale' className='w-[20px] h-[20px]' />
						<p>Sale</p>
						<input onChange={handleChange} checked={sideBarData.offer} type="checkbox" id='offer' className='w-[20px] h-[20px]' />
						<p>Offer</p>
					</div>
					<div className='flex gap-2  items-center flex-wrap' >
						<p className='font-semibold'>Ambients:</p>
						<input onChange={handleChange} checked={sideBarData.parking} type="checkbox" id='parking' className='w-[20px] h-[20px]' />
						<p>Parking</p>
						<input onChange={handleChange} checked={sideBarData.furnished} type="checkbox" id='furnished' className='w-[20px] h-[20px]' />
						<p>Furnished</p>

					</div>

					<div className='flex gap-2 items-center '>
						<span className='font-semibold'>Sort:</span>
						<select onChange={handleChange} defaultValue={'created_at_desc'}
							id="sort_order" className='p-3 border border-gray-300 rounded-lg' >
							<option value="regularPrice_desc">Price High to low</option>
							<option value="regularPrice_asc">Price low to high</option>
							<option value="createdAt_desc">latest</option>
							<option value="createdAt_asc">oldest</option>
						</select>
					</div>
					<button className='p-3 rounded-lg text-white bg-yellow-600 uppercase font-semibold'>Search</button>
				</form>
			</div>
			<div className='flex flex-col flex-[68%] p-6   '>
				<h1 className='text-3xl my-4 font-semibold'>Listing Results:</h1>
				<hr className='h-[2px] w-[95%] bg-gray-300' />
				{loading && <span className='self-center align my-8 text-xl font-semibold'>Loading...</span>}
				<div className='flex gap-4   flex-wrap mt-8 pl-1 '>

					{error && <span className='  my-2 text-xl font-semibold'>No Listing</span>}
					{listings && !loading &&
						listings.map((listing, index) => (
							<Link to={`/listing/${listing._id}`} key={index} className='w-[320px] overflow-hidden rounded-lg bg-slate-200 shadow-md '>

								<img src={listing.imageUrls[0] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGeMDi9ZDgxUu0mAc-u1k-BIT3U9WJHFZIwg&s"}
									alt="image" className='w-full h-[320px] sm:h-[220px]  rounded-t-lg object-cover hover:scale-105
									transition-scale duration-300' />

								<div className='flex flex-col gap-2 my-2 p-3 '>
									<h1 className='font-semibold text-lg text-slate-600'>{listing.name}</h1>
									<span className='text-gray-600 text-[12px] flex gap-1 items-center'>
										<FaMapMarkerAlt className='text-green-600' /> {listing.address}</span>
									<span className='text-gray-600  text-[12px] flex overflow-clip max-h-[35px]'>{listing.description}</span>
									{listing.offer ? <span className='text-slate-500 font-semibold'>₹{listing?.discountPrice.toLocaleString()}/month</span> :
										<span className='text-slate-500 font-semibold'>₹{listing?.regularPrice.toLocaleString()}</span>}
									<div className='flex gap-4 items-center '>

										<span className='text-xs font-semibold'>{listing.bedrooms} Beds</span>

										<span className='text-xs font-semibold'>{listing.bathrooms} Baths</span>
									</div>
								</div>
							</Link>
						))
					}




				</div>

			</div>
		</main>
	)
}

export default Search
