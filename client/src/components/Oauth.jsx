import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signinSuccess } from '../redux/user/userSlice'
import {useNavigate} from 'react-router-dom'
const Oauth = () => {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })

            })
            const data =await res.json()//extract particularly json file from http response
            dispatch(signinSuccess(data))
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <button onClick={handleGoogleClick} type='button' className='bg-[#DB4437] text-white p-3 rounded-lg
        				 hover:opacity-95 disabled:opacity-95'>CONTINUE WITH GOOGLE</button>
    )
}

export default Oauth
