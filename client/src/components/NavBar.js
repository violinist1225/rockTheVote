import React from "react"
import {Link} from "react-router-dom"
export default function NavBar(props){
    const {handleLogout} = props
    return (
        <div>
            <Link to="/profile" > Profile </Link>
            <Link to="/public" > Public </Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
    
}