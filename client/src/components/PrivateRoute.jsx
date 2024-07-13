
import { useSelector } from "react-redux"
import { Outlet,Navigate } from "react-router-dom"
const PrivateRoute = () => {
    const {currentUser}=useSelector((state)=>state.user)
    /* Oulet is a child compoent Route of this component which is defined in App.jsx  to render */
  return (
    currentUser ? <Outlet /> : <Navigate to='sign-in'/>
  )
}

export default PrivateRoute
