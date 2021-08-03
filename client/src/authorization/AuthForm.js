import React, {useContext} from "react"
import {AuthContext} from "../context/AuthContext.js"


function AuthForm() {
    const {formState, handleChange, handleSignUp, handleLogin} = useContext(AuthContext)
    return (
        <>
        SignUp
        <form onSubmit={handleSignUp}>
            <input
            name="signupUsername"
            placeholder="Username"
            value={formState?.signupUsername}
            //ES6 ternary update does not require full formState?.signupUsername:null
            onChange={handleChange}
            />
            <input
            name="signupPassword"
            placeholder="Password"
            value={formState?.signupPassword}
            onChange={handleChange}
            />
            <button>Submit</button>

            
        </form>
        Login
        <form onSubmit={handleLogin}>
            <input
            name="loginUsername"
            placeholder="Username"
            value={formState?.loginUsername}
            onChange={handleChange}
            />
            <input
            name="loginPassword"
            placeholder="Password"
            value={formState?.loginPassword}
            onChange={handleChange}
            />
            <button>Submit</button>

            
        </form>
        </>
    )}


export default AuthForm