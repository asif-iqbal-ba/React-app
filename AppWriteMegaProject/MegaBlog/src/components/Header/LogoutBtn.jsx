import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../Appwrite/auth'
import {logout} from '../../sotre/authSlice'
function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandle = ()=>{
        authService.logOut().then(()=>{
            dispatch(logout)
        })
    }
  return (
    <button>
        Logout
         </button>
  )
}
export default LogoutBtn
