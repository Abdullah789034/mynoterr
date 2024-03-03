import React from 'react'
import { Link , useLocation} from "react-router-dom";
import {  useNavigate } from 'react-router-dom'
import Signup from './Signup';


const NoLog = () => {
    // const navigation = useNavigate();
    //   const authToken=localStorage.getItem("authToken")
    //   if(authToken!==""){
    //     navigation('/home')
    //   }
    
    
  return (
    <div>
      KINDLY LOGIN OR SIGNUP  
      <Link type="button" className="btn btn-primary mx-2" to='/login'>Login</Link>
        <Link type="button" className="btn btn-primary mx-2" to='/signup'>Sign up</Link>
    </div>
  )
}

export default NoLog
