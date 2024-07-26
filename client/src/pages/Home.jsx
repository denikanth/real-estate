import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'

import { Link } from 'react-router-dom'
import { FaMapMarkerAlt } from 'react-icons/fa'

const Home = () => {
  SwiperCore.use([Navigation])
  
  const [offerListings, setOfferListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  const [saleListings, setSaleListings] = useState([])

  useEffect(() => {
    const fetchOfferListings = async () => {

      try {
        
        const res = await fetch('/api/listing/get?offer=true&limit=5')
        const data = await res.json()
        setOfferListings(data)

        fetchRentListings()
      } catch (err) {
        console.log(err);
      }

    }
    const fetchRentListings = async () => {

      try {
        const res = await fetch('/api/listing/get?type=rent&limit=5')
        const data = await res.json()
        setRentListings(data)

        fetchSaleListings()
      } catch (err) {
        console.log(err);
      }

    }
    const fetchSaleListings = async () => {

      try {
        const res = await fetch('/api/listing/get?type=sale&limit=5')
        const data = await res.json()
        setSaleListings(data)

        
      } catch (err) {
        console.log(err);
      }

    }


    fetchOfferListings()
    
  }, [])
  console.log(offerListings);
  return (
    <div >
      <div className='flex flex-col max-w-[1120px]  mx-auto my-24 gap-4 p-3 '>
        <h1 className='text-2xl sm:text-5xl  font-bold text-slate-700'>Find Your next <span
          className=' text-slate-500'>Perfect</span><br />place with rase</h1>

        <p className='text-slate-500 text-[12px] sm:text-sm '>Deni Estate will help you find your home fast, easy and comfortable. <br />
          Our expert support are always available.</p>
        <Link to={`/search`} className='text-blue-800 hover:underline  font-bold cursor-pointer'>Lets Start now....</Link>
      </div>

      <Swiper navigation className='mb-8'>
        {offerListings && offerListings.length > 0 && rentListings.map((url, index) =>  (
          
          <SwiperSlide key={index}>
            
            <img className='h-[85vh] object-fill  w-full' src={url.imageUrls[0]} alt="" />
            {/* <div className='h-[70vh] '
              style={{ background: `url(${url.imageUrls[0]}) no-repeat cover   center `,   }}>
                
            </div> */}

          </SwiperSlide>

        ))}
      </Swiper>

      <div className='max-w-[1120px] mx-auto p-3 '>
        <p className='text-xl font-bold text-slate-700'>Recent Offers</p>
        <Link to={`/search?offer=true`} className='font-semibold text-blue-700 hover:underline cursor-pointer text-sm'>show more offer</Link>
        {/* offer listings */}
        <div className='flex gap-4   flex-wrap mt-2 flex-col sm:flex-row '>
          {offerListings &&
            offerListings.map((listing, index) => (
              <Link to={`/listing/${listing._id}`} key={index} className='w-[350px] overflow-hidden rounded-lg bg-slate-200 shadow-md '>

                <img src={listing.imageUrls[0] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGeMDi9ZDgxUu0mAc-u1k-BIT3U9WJHFZIwg&s"}
                  alt="image" className='w-full h-[320px] sm:h-[220px]  rounded-t-lg object-cover hover:scale-105
									transition-scale duration-300' />

                <div className='flex flex-col gap-2 my-2 p-3 '>
                  <h1 className='font-semibold text-lg text-slate-600'>{listing.name}</h1>
                  <span className='text-gray-600 text-[12px] flex gap-1 items-center'>
                    <FaMapMarkerAlt className='text-green-600' /> {listing.address}</span>
                  <span className='text-gray-600  text-[12px] flex overflow-clip max-h-[35px]'>{listing.description}</span>
                  <span className='text-slate-500 font-semibold'>₹{listing?.discountPrice.toLocaleString()}/month</span> 
                    
                  <div className='flex gap-4 items-center '>

                    <span className='text-xs font-semibold'>{listing.bedrooms} Beds</span>

                    <span className='text-xs font-semibold'>{listing.bathrooms} Baths</span>
                  </div>

                </div>

              </Link>
            ))
          }
        </div>
        {/* rent  */}
        <p className='text-xl font-bold mt-10 text-slate-700'>Recent places for rent</p>
        <Link to='/search?type=rent' className='font-semibold text-blue-700 hover:underline cursor-pointer text-sm'>show more places for rent</Link>
        <div className='flex gap-4   flex-wrap mt-2  flex-col sm:flex-row '>
          {rentListings &&
            rentListings.map((listing, index) => (
              <Link to={`/listing/${listing._id}`} key={index} className='w-[350px] overflow-hidden rounded-lg bg-slate-200 shadow-md '>

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
        {/* sale */}
        <p className='text-xl font-bold mt-10 text-slate-700'>Recent places for sale</p>
        <Link to='/search?type=sale' className='font-semibold text-blue-700 hover:underline cursor-pointer text-sm'>show more places for sale</Link>
        <div className='flex gap-4   flex-wrap mt-2  flex-col sm:flex-row '>
          {saleListings &&
            saleListings.map((listing, index) => (
              <Link to={`/listing/${listing._id}`} key={index} className='w-[350px] overflow-hidden rounded-lg bg-slate-200 shadow-md '>

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

    </div>


  )
}

export default Home
