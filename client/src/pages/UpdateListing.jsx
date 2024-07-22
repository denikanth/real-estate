
import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { useSelector } from 'react-redux'
import { useNavigate ,useParams} from 'react-router-dom'
const UpdateListing = () => {
    const navigate = useNavigate()
    const {id}=useParams()
	const { currentUser } = useSelector((state) => state.user)
	const [files, setFiles] = useState([])
	const [formdata, setFormdata] = useState({
		name: '',
		description: '',
		address: '',
		regularPrice: 50,
		discountPrice: 0,
		bedrooms: 1,
		bathrooms: 1,
		type: 'rent',
		parking: false,
		furnished: false,
		offer: false,
		imageUrls: []
	})
	const [uploadImageError, setUploadImageError] = useState(null)
	const [uploading, setUploading] = useState(false)
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)

    useEffect(()=>{
        fetchData()
    },[])
    const fetchData=async()=>{
        const res=await fetch(`/api/listing/get-listing/${id}`)
		const data=await res.json()
		if(data.success=== false){
			console.log(console.log(data.message));
			return
		}
		setFormdata(data)
    }
    const handleDelete = (index) => {
		setFormdata({
			...formdata,
			imageUrls: formdata.imageUrls.filter((_, i) => i !== index)
		})
	}
	const handleImageSubmit = async () => {
		if (files.length > 0 && files.length + formdata.imageUrls.length < 7) {
			setUploadImageError(null)
			setUploading(true)
			const promises = []
			for (let i = 0; i < files.length; i++) {
				promises.push(storeImage(files[i]))

			}
			Promise.all(promises).then((urls) => {
				setFormdata({
					...formdata, imageUrls: formdata.imageUrls.concat(urls)
				})
				setUploading(false)
				setFiles([])
			}).catch((err) => {
				setUploadImageError("image uploaded failed(2mb max per image)")
				setUploading(false)
			})//if any one promise in rejected in promises array then Promise.all() wont wait for other it will immediatly run the catch block

		}
		else {
			setUploadImageError("Total number of images must be less than 7 and at least 1 image must be selected")
			setUploading(false)

		}
	}
	const storeImage = async (file) => {
		return new Promise((resolve, reject) => {
			const storage = getStorage(app)
			const fileName = new Date().getTime() + file.name
			const storageRef = ref(storage, fileName)
			const uploadTask = uploadBytesResumable(storageRef, file);//uploadtask variable contain the ref of file that is stored in firebase storage
			uploadTask.on("state_changed",
				(snapshot) => {
					const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100
					console.log(progress)
				},
				(err) => {
					console.log(err);
					reject(err)
				}, () => {
					getDownloadURL(uploadTask.snapshot.ref).then((url) => { resolve(url) })
				}
			)
		})

	}
	const handleChange = (e) => {//here i managed to get differnt type of inputs and store in state variable
		
		if (e.target.id === 'sale' || e.target.id === 'rent') {//checkbox input but i only had type property in state variable
			setFormdata({
				...formdata,
				type: e.target.id
			})
		}
		if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') { // i managed booleans
			setFormdata({
				...formdata,
				[e.target.id]: e.target.checked
			})
		}
		if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {// i managed normal text and number values
			console.log(e.target.type)
			setFormdata({
				...formdata,
				[e.target.id]: e.target.value
			})
		}
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (formdata.imageUrls.length < 1) return setError("you must have to upload atleast one image")
		//i used + because it sometimes had string type for number so it convert string to number 
		if (+formdata.regularPrice < +formdata.discountPrice) return setError("discount price mus be less than regular price")
		try {
			setLoading(true)
			setError(false)
			const res = await fetch(`/api/listing/update/${id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formdata)
			})
			const data = await res.json()
			setLoading(false)
			if (data.success === false) {
				setError(data.message)
				setLoading(false)
			}
			console.log(data);
			navigate(`/listing/${data._id}`)
		} catch (err) {
			console.log(err);
			setError(true)
		}
	}
	console.log(id);
    return (
		<main className='p-3 max-w-4xl mx-auto '>
			<h1 className='text-center text-3xl font-bold my-8'>Edit Listing</h1>
			<form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-3  '>

				<div className='flex flex-col gap-4 flex-1'>
					<input onChange={handleChange} value={formdata.name} className='p-3  bg-gray-300 border border-gray-400 rounded-lg ' type="text" id='name' placeholder='Name'
						maxLength='62' minLength='10' required />
					<textarea onChange={handleChange} value={formdata.description} className='p-3  bg-gray-300 border border-gray-400 rounded-lg resize-none' type="text" id='description' placeholder='Description'
						required maxLength='600' />
					<input onChange={handleChange} value={formdata.address} className='p-3  bg-gray-300 border border-gray-400 rounded-lg' type="text" id='address' placeholder='Address'
						required />
					<div className='flex gap-3 flex-wrap'>
						<div className='flex items-center gap-2 '>
							<input onChange={handleChange} checked={formdata.type === 'sale'} type="checkbox" id='sale' className='w-5 h-5' />
							<span className='text-xl'>sell</span>
						</div>
						<div className='flex items-center gap-2 '>
							<input checked={formdata.type === 'rent'} onChange={handleChange} type="checkbox" id='rent' className='w-5 h-5' />
							<span className='text-xl'>Rent</span>
						</div>
						<div className='flex items-center gap-2 '>
							<input onChange={handleChange} checked={formdata.parking} type="checkbox" id='parking' className='w-5 h-5' />
							<span className='text-xl'>Parking spot</span>
						</div>
						<div className='flex items-center gap-2 '>
							<input onChange={handleChange} checked={formdata.furnished} type="checkbox" id='furnished' className='w-5 h-5' />
							<span className='text-xl'>Furnished</span>
						</div>
						<div className='flex items-center gap-2 '>
							<input onChange={handleChange} checked={formdata.offer} type="checkbox" id='offer' className='w-5 h-5' />
							<span className='text-xl'>offer</span>
						</div>
					</div>

					<div className='flex gap-3 flex-wrap '>
						<div className='flex gap-3 items-center '>
							<input onChange={handleChange} value={formdata.bedrooms} type="number" className='bg-gray-300 p-3 
								rounded-lg border border-gray-400' min={1} max={10} id='bedrooms'
								required />
							<span>Beds</span>
						</div>
						<div className='flex gap-3 items-center '>
							<input onChange={handleChange} value={formdata.bathrooms} type="number" required className='bg-gray-300 p-3 
								rounded-lg border border-gray-400' min='1' max='10' id='bathrooms' />
							<span>Baths</span>
						</div>
						<div className='flex gap-3 items-center '>
							<input onChange={handleChange} value={formdata.regularPrice} type="number" required className='bg-gray-300 p-3 
								rounded-lg border border-gray-400' min='1' max='100000000' id='regularPrice' />
							<div className='flex flex-col '>
								<span>Regular Price</span>
								{formdata.type === 'rent' && <p className='text-xs'>(₹/month)</p>}

							</div>
						</div>
						{formdata.offer && (
							<div className='flex gap-3 items-center '>
								<input onChange={handleChange} value={formdata.discountPrice} type="number" required className='bg-gray-300 p-3 
								rounded-lg border border-gray-400' min='1' max='100000000' id='discountPrice' />
								<div className='flex flex-col '>
									<span>Discounted Price</span>
									{formdata.type === 'rent' && <p className='text-xs'>(₹/month)</p>}
								</div>
							</div>
						)}




					</div>
				</div>
				<div className='flex flex-1 flex-col gap-4 ' >
					<div className='flex gap-1'>
						<p className='font-semibold'>Images:</p>
						<span className='text-gray-600'>The first image will be the cover image (max 6)</span>
					</div>
					<div className='flex gap-2'>
						<input onChange={(e) => setFiles(e.target.files)} id='images' type="file" className='p-3 border w-full border-gray-400 rounded' accept='image/*'  multiple />
						<button disabled={uploading} onClick={handleImageSubmit} type='button' className='bg-white border border-green-500 px-4 py-4 rounded uppercase text-green-500 
						cursor-pointer hover:shadow-xl disabled:opacity-75'   >{uploading ? "uploading..." : "Upload"}</button>
					</div>

					{uploadImageError && <p className='text-red-700'>{uploadImageError}</p>}
					{formdata.imageUrls.map((url, index) => (
						<div className='flex rounded justify-between p-3 border border-gray-300 shadow-md' key={url}>
							<img src={url} alt='image' className='w-20 h-20 rounded-lg object-contain' />
							<button type='button' onClick={() => handleDelete(index)} className='text-red-600 p-3
							hover:opacity-75'>Delete</button>
						</div>
					))}
					<button disabled={loading || uploading} className='bg-green-700 text-center p-3 rounded-lg uppercase text-white hover:opacity-95 disabled:opacity-75'>{loading ? 'Updating' : 'Edit listing'}</button>
					{error && <p className='text-red-700'>{error}</p>}
				</div>

			</form>
		</main>
	)
}

export default UpdateListing
