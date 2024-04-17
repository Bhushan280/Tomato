import React, { useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'


const LoginPopUp = ({ setshowLogin }) => {

    const [currState, setCurrState] = useState("Login")
    return (
        <div className='login-popup'>
            <form action="" className="login-pop-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setshowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-input">
                    {
                        currState === 'Login' ? <></> : <input type="text" placeholder='Your name' required />
                    }
                    <input type="email" placeholder='Your email' required />
                    <input type="password" placeholder='password' required />
                </div>
                <button>{currState === 'Sign Up' ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By Continuing, I agree to the terms of use & privacy Policy</p>
                </div>
                {
                    currState==="Login" 
                    ? <p>Create a new account? <span onClick={()=>setCurrState('Sign Up')}>Click here</span> </p>
                    : <p>Already Have an account? <span onClick={()=>setCurrState('Login')}>Login here</span> </p> 
                } 
            </form>
        </div>
    )
}

export default LoginPopUp
