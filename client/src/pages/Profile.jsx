import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getDownloadURL, getStorage,ref,uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
const Profile = () => {
  const {loading,error}=useSelector((state)=>state.user)
  const {currentUser}=useSelector((state)=>state.user)
  const [file,setFile]=useState(undefined)
  const [filePercent,setFilePercent]=useState(0)
  const fileRef=useRef(null)
  const [fileUploadError,setFileUploadError]=useState(false)
  const [formdata,setFormData]=useState({})

  useEffect(()=>{
    if(file){
      handleFileUpload(file)
    }
  },[file])

    const handleFileUpload=async (file)=>{
      const storage=getStorage(app)//geting an access to storsge in firebase through my firebase configuratin which is initialized in app
      const fileName=new Date().getTime() +file.name
      const storageRef=ref(storage,fileName)//creating an reference or name  my file that is being stored in storage of firebase
      const uploadTask=uploadBytesResumable(storageRef,file)//here upload process takes place ,here i use this function because iam able to get the status of upload progress
      uploadTask.on('state_changed',
        (snapshot)=>{
          const progress=snapshot.bytesTransferred/snapshot.totalBytes *100//snapshot is an object that contain all the value changed durating an upload task
          //console.log('upload done '+progress+'% done')
          setFilePercent(Math.round(progress))
          setFileUploadError(false)
        },
        (err)=>{
          console.log(err.message)
          setFileUploadError(true)
        },
        ()=>{
          //uploadTask.snapshot.ref will give the location of current uploaded image in firebase
          //getDownloadUrl will genrate url of that image location
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>setFormData({...formdata,avatar:downloadUrl}))
          console.log(uploadTask.snapshot.ref+ " this is download url")
          setFileUploadError(false)
        }
      )
  }
  return (

    <div className='flex items-center justify-center flex-col
    gap-4 pt-6 '>

      <h1 className='text-3xl font-semibold mb-3'>Profile</h1>
      <input onChange={(e)=>setFile(e.target.files[0])} ref={fileRef} type="file" accept='image/*' hidden />
      <img onClick={()=>fileRef.current.click()}  src={formdata.avatar ||currentUser.avatar} className='rounded-full 
          object-cover h-24 w-24 cursor-pointer'  alt="" />
          <p className='self-center'>
            {
              fileUploadError ? <span className='text-red-700'>Error Image Upload(image must be less than 2mb)</span>:
              filePercent > 0 && filePercent < 100 ?<span className='text-green-700'>{`uploading ${filePercent}%`}</span>
              :filePercent===100?<span className='text-green-600'>Image Successfuly uploaded</span>
              :""
            }
          </p>
      <div className='w-[300px] sm:w-[480px]'>
        <form  className='flex flex-col gap-4 '>
          <input className='p-3 rounded-lg border bg-gray-300 ' placeholder='username'
            name='username' id='username' />
          <input  className='p-3 rounded-lg border bg-gray-300' type="email" placeholder='email'
            name='email' id='email' />
          <input  className='p-3 rounded-lg border bg-gray-300' type="password" placeholder='password'
            name='password' id='password' />
          <button disabled={loading} className='bg-[#4285F4] text-white p-3 rounded-lg hover:opacity-95
         			outline-none disabled:opacity-80' >{loading ? 'loading..' : 'Update'}</button>
          <button disabled={loading} className='bg-[#0b870fb1] text-white p-3 rounded-lg hover:opacity-95
         			outline-none disabled:opacity-80' >{loading ? 'loading..' : 'Create Listing'}</button>
          
        </form>
        <div className='flex justify-between mt-4'>

          <p className='text-red-700 cursor-pointer'>Delete Account</p>
          <p className='text-red-700 cursor-pointer'>Sign out</p>
        </div>
      </div>
      
      {error && <p className='text-red-600 '>{error}</p>}
    </div>
  )
}

export default Profile
