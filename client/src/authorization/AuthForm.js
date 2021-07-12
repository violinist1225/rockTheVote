import React, {useContext} from "react"
import {AuthContext} from "./AuthContext.js"


function AuthForm() {
    const {formState, handleChange, handleSignUp, handleLogin} = useContext(AuthContext)
    return (
        <>
        SignUp
        <form onSubmit={handleSignUp}>
            <input
            name="username"
            placeholder="Username"
            value={formState?formState.username:null}
            onChange={handleChange}
            />
            <input
            name="password"
            placeholder="Password"
            value={formState?formState.password:null}
            onChange={handleChange}
            />
            <button>Submit</button>

            
        </form>
        Login
        <form onSubmit={handleLogin}>
            <input
            name="username"
            placeholder="Username"
            value={formState?formState.username:null}
            onChange={handleChange}
            />
            <input
            name="password"
            placeholder="Password"
            value={formState?formState.password:null}
            onChange={handleChange}
            />
            <button>Submit</button>

            
        </form>
        </>
    )}


export default AuthForm