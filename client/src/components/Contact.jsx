import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const Contact = ({listing}) => {
    const [landlord,setLandLord]=useState()
    const [message, setmessage] = useState("")
    useEffect(()=>{
        const getUser=async()=>{

            try {
                const res=await fetch(`/api/user/${listing.userRef}`)
                const data=await res.json()
                if(data.success === false){
                    return
                }

                setLandLord(data)
            } catch (err) {
                console.log(err);
            }
        }
        getUser()
    },[listing.userRef])
    
  return (
    <div>
         {landlord && (<div className='flex flex-col gap-2'>
      <p className='mt-3'>contact <span className='font-semibold'>{landlord?.username}</span > for <span
      className='font-semibold'>{listing.name}</span></p>
      <textarea maxLength={600} onChange={(e)=>setmessage(e.target.value)} value={message} name="contact" id="contact" rows={2} className='w-full p-3 border bg-gray-200
      rounded-lg border-gray-300' placeholder='Enter your message here...'> </textarea>
      <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message} `} className='w-full bg-blue-500 rounded-lg p-3 text-center hover:opacity-90 uppercase text-white
      font-semibold'> send Message </Link>
    </div>) }
    </div>
   
    
  )
}

export default Contact
