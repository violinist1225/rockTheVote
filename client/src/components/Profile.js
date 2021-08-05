import React, {createContext, useContext, useEffect, useState} from "react"
import {AuthContext} from "../context/AuthContext.js"
import { UserContext } from "../context/UserContext.js"
import ProfileIssueForm from "./ProfileIssueForm.js"
import EditIssueForm from "./EditIssueForm.js"
import Issue from "./Issue.js"

export default function Profile(){
    const {user, setUserState} = useContext(AuthContext)
    const {issues, getIssues, users, getUsers, deleteIssue} = useContext(UserContext)
    const {username} = user
    const [hideEditForm, setHideEditForm ] = useState(true)

    const myIssues = issues.map(issue => (
        issue.userId === user._id?


        <>
            <Issue issue={issue} username={users && users.find(user => user._id === issue.userId) &&  users.find(user => user._id === issue.userId).username} setHideEditForm={setHideEditForm} removeCreatedUser={true}/> 

            {
            hideEditForm?
            null:
            <>
            <EditIssueForm issue={issue} setHideEditForm={setHideEditForm} />{/*Use conditional rendering to hide this form*/}
            </>
            }
        </>



        :null

    ))

    useEffect(() => {
        setUserState({
            token: localStorage.getItem("token") || "",
            user: JSON.parse(localStorage.getItem("user")) || "",
            errMsg: ""
        })
        getIssues()}, 
        [])

    return (
        <div>
            <h1>Welcome {username}!</h1>
            <ProfileIssueForm />
            <h2 style={{textAlign: "center", color: "purple", }}>{username}'s Issues</h2>
            {myIssues}
           
            
        </div>
    )
    
}