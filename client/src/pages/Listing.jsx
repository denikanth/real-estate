import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'
import { FaMapMarkerAlt, FaBed, FaParking, FaChair, FaBath, FaShare } from 'react-icons/fa'
import Contact from '../components/Contact'
const Listing = () => {
	SwiperCore.use([Navigation])

	const location = useLocation()
	const domain = window.location.hostname;
	const [listing, setListing] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [copied, setCopied] = useState(false)
	const { listingId } = useParams()
	const [contact, setContact] = useState(false)
	const { currentUser } = useSelector((state) => state.user)
	useEffect(() => {

		const fetchListing = async () => {

			try {

				setLoading(true)
				setError(false)
				const res = await fetch(`/api/listing/get-listing/${listingId}`)
				const data = await res.json()

				if (data.success === false) {
					setError(true)
					setLoading(false)
					return

				}

				setListing(data)
				setLoading(false)

			} catch (err) {
				setError(true)
				setLoading(false)
			}
		}
		fetchListing()
	}, [listingId])
	const handleCopyToClipboard = () => {
		navigator.clipboard.writeText(`${domain}${location.pathname}`).then(() => {

			setCopied(true)
			setTimeout(() => { setCopied(false) }, 3000)
		}).catch((err) => {
			setCopied(false)
		});
	};


	return (
		<main>

			{loading && <p className='my-7 text-xl text-center'>Loading...</p>}
			{error && <p className='my-7 text-xl text-center'>Something went wrong...</p>}
			{listing && !loading && !error && (
				< div >
					<Swiper navigation>
						{listing.imageUrls.map((url, index) => (
							<SwiperSlide key={index}>
								<div className='h-[75vh]  '
									style={{ background: `url(${url}) no-repeat  center `, backgroundSize: '100vw 100vh' }}>

								</div>

							</SwiperSlide>

						))}
					</Swiper>
					<div className='max-w-4xl mx-auto p-2 '>
						<h1 className='text-3xl font-semibold my-7 mx-auto'>{listing.name} - ₹ {listing.type === "sale" ?
							listing?.regularPrice.toLocaleString() : `${listing?.regularPrice.toLocaleString()}/month`}</h1>

						<div className='flex flex-col flex-wrap gap-2 '>
							<p className='flex gap-2 items-center font-medium text-slate-600'>
								<FaMapMarkerAlt className='text-green-600' />
								{listing.address}
							</p>
							<div className='flex gap-4 max-w-[440px]   h-9 '>
								<button className=' max-w-[220px] flex-1 text-white bg-red-900 p-1 rounded-lg'>{listing.type === "sale" ? "For Sale" : "For Rent"}</button>
								{
									listing?.offer && <button className='max-w-[220px] flex-1  font-semibold text-white bg-green-900 p-1 rounded-lg'>{`₹${listing?.discountPrice.toLocaleString()} discount`}</button>
								}

							</div>

							<p>
								<span className='font-semibold'>Description: </span>
								{listing.description}
							</p>
							<div className='flex gap-4  flex-wrap'>
								<div className='flex gap-2 items-center '>
									<FaBed className='text-green-800 w-5 h-5' />
									<p className='text-sm text-green-800 font-semibold'>{listing.bedrooms} Beds</p>

								</div>
								<div className='flex gap-2 items-center  '>
									<FaBath className='text-green-800 w-5 h-5' />
									<p className='text-sm text-green-800 font-semibold'>{listing.bathrooms} Baths</p>

								</div>

								<div className='flex gap-2 items-center   '>
									<FaParking className='text-green-800 w-5 h-5' />
									<p className='text-sm text-green-800 font-semibold'>{listing.parking ? 'Parking Spot' :
										'No Parking'}</p>

								</div>

								<div className='flex gap-2 items-center   '>
									<FaChair className='text-green-800 w-5 h-5' />
									<p className='text-sm text-green-800 font-semibold'>{listing.furnished ? 'Furnished' :
										'Not Furnished'}</p>

								</div>

							</div>
							{currentUser._id && listing.userRef !== currentUser._id && !contact &&
								<button onClick={() => setContact(true)} className='bg-violet-700 rounded-lg mt-6
                             text-slate-100 hover:opacity-90 text-lg p-2'>Contact Landlord</button>
							}
							{contact && <Contact listing={listing} />}
						</div>
					</div>
					<div onClick={handleCopyToClipboard} className='cursor-pointer  fixed top-[90px] right-10 z-50 rounded-full bg-slate-200 p-4'>
						<FaShare className='text-slate-500' />
					</div>
					{
						copied &&
						<div className=' fixed top-[150px] right-16 z-50 rounded-lg bg-slate-200 p-2'>
							Link copied!
						</div>
					}

				</div>)
			}

		</main >
	)
}

export default Listing
