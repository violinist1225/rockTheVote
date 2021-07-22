import React, {useContext, useEffect} from "react"
import {UserContext} from "../context/UserContext.js"
export default function Public(){
    const {issues, getIssues} = useContext(UserContext)
    const renderedIssues = issues.map(issue => (
        <div>
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
            <img src={issue.imageUrl}/>
        </div>
    ))
    useEffect(() => {
        console.log("hello world!")
        return getIssues
    }, [])
    return (
        <div>
            <h1>Public Posts</h1>
            {renderedIssues}
        </div>
    )
    
}