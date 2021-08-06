import React, {useContext, useEffect, useState} from "react"
import { AuthContext } from "../context/AuthContext.js"
import {UserContext} from "../context/UserContext.js"
import EditIssueForm from "./EditIssueForm.js"
import Issue from "./Issue.js"
export default function Public(){
    const {issues, getIssues, users, getUsers, comments, getComments} = useContext(UserContext)
    const {setUserState} = useContext(AuthContext)
   
    const renderedIssues = issues.map(issue => (
        <>
        <Issue issue={issue} 
        username={users && users.find(user => user._id === issue.userId) &&  users.find(user => user._id === issue.userId).username}
        comments={comments && comments.filter(comment => issue._id === comment.issueId )}
        /> 
        </>

    ))
    console.log(comments)
    useEffect(() => {
         getIssues()
         getUsers()
         getComments()
         setUserState({
            token: localStorage.getItem("token") || "",
            user: JSON.parse(localStorage.getItem("user")) || "",
            errMsg: ""
        })
         return
    }, [])

    return (
        <div>
            <h1 style={{textAlign: "center", marginBottom: "25px", color: "palegoldenrod"}} >Public Posts</h1>
            {renderedIssues}
           
        </div>
    )
    
}