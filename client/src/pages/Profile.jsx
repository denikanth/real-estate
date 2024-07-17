import React, { useEffect, useRef, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getDownloadURL, getStorage,ref,uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import {  deleteUserFailure, deleteUserSuccess, delteUserStart, signoutUserFailure, signoutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice'
const Profile = () => {
  const {loading,error,currentUser}=useSelector((state)=>state.user)
  
  const [file,setFile]=useState(undefined)
  const [filePercent,setFilePercent]=useState(0)
  const fileRef=useRef(null)
  const [fileUploadError,setFileUploadError]=useState(false)
  const [formdata,setFormData]=useState({})
  const [UpdateComplete,setUpdateComplete]=useState(false)//this is additional
  const dispatch=useDispatch()
  useEffect(()=>{
    if(file){
      handleFileUpload(file)
    }
  },[file])

    const handleChange=(e)=>{
     
         setFormData({
          ...formdata,
          [e.target.id]:e.target.value
        })
        
    }
    const handleSubmit=async(e)=>{
      e.preventDefault()
      dispatch(updateUserStart())
      try {
        const res=await fetch(`/api/user/update/${currentUser._id}`,{
          method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formdata)
        
      })
      const data=await res.json()
      if (data.success === false) {
				dispatch(updateUserFailure(data.message))
				setUpdateComplete(false)//this is additional
				return;
			}

      dispatch(updateUserSuccess(data))
      setFilePercent(0)//this is additional
      setUpdateComplete(true)//this is additional
      setTimeout(()=>{setUpdateComplete(false)},5000)//this is additional
      
      } catch (err) {
        dispatch(updateUserFailure(err.message))
        setUpdateComplete(false)//this is additional
      }
      

    }
    const handleDelete=async()=>{
      dispatch(delteUserStart())
      try {
        const res=await fetch(`api/user/delete/${currentUser._id}`,{
          method:'DELETE'
        })

        const data=await res.json()

        if(data.success ===false){
          dispatch(deleteUserFailure(data.message))
          return
        }
        dispatch(deleteUserSuccess())
      } catch (err) {
        dispatch(deleteUserFailure(err.message))
      }
    }

    const handlesignout=async()=>{

      try {
        const res=await fetch('api/auth/signout')
          

        const data=await res.json()
        
        if(data.success ===false){
          dispatch(signoutUserFailure(data.message))
          return
        }
        dispatch(signoutUserSuccess())
      } catch (err) {
        dispatch(signoutUserFailure(err.message))
      }
    }


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
          <p className='self-center '>
            {
              fileUploadError ? <span className='text-red-700'>Error Image Upload(image must be less than 2mb)</span>:
              filePercent > 0 && filePercent < 100 ?<span className='text-green-700'>{`uploading ${filePercent}%`}</span>
              :filePercent===100?<span className='text-green-600'>Image Successfuly uploaded</span>
              :""
            }
          </p>
           <p className='text-green-600'>{UpdateComplete ? 'Updated Successfully':''}</p> 
           {error && <p className='text-red-600 '>{error}</p>}
      <div className='w-[300px] sm:w-[480px]'>
        <form  onSubmit={handleSubmit} className='flex flex-col gap-4 '>
          <input onChange={handleChange}   className='p-3 rounded-lg border bg-gray-300 ' placeholder='username'
            name='username' id='username' defaultValue={currentUser.username} />
          <input onChange={handleChange}   className='p-3 rounded-lg border bg-gray-300' type="email" placeholder='email'
            name='email' id='email' defaultValue={currentUser.email}  />
          <input onChange={handleChange}  className='p-3 rounded-lg border bg-gray-300' type="password" placeholder='password'
            name='password' id='password'  />
          <button disabled={loading} className='bg-[#4285F4] text-white p-3 rounded-lg hover:opacity-95
         			outline-none disabled:opacity-80' >{loading ? 'loading..' : 'Update'}</button>
        <Link to='/create-listing' className='bg-green-700 text-center p-3 rounded-lg uppercase text-white hover:opacity-95'>
        Create Listing</Link>
          
        </form>
        <div className='flex justify-between mt-4'>

          <p className='text-red-700 cursor-pointer' onClick={handleDelete}>Delete Account</p>
          <p className='text-red-700 cursor-pointer' onClick={handlesignout}>Sign out</p>
        </div>
      </div>
      
      
    </div>
  )
}

export default Profile
