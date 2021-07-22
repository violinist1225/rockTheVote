import React, {createContext, useContext} from "react"
import {AuthContext} from "../context/AuthContext.js"
export default function Profile(){
    const {user} = useContext(AuthContext)
    const {username} = user

    return (
        <div>
            <h1>Welcome {username}!</h1>
        </div>
    )
    
}