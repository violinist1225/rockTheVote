import React, {createContext, useContext, useEffect} from "react"
import {AuthContext} from "../context/AuthContext.js"
import { UserContext } from "../context/UserContext.js"
import EditIssueForm from "./EditIssueForm.js"
import Issue from "./Issue.js"

export default function Profile(){
    const {user} = useContext(AuthContext)
    const {issues, getIssues, users, getUsers} = useContext(UserContext)
    const {username} = user

    const myIssues = issues.map(issue => (
        issue.userId === user._id?
        <>
        <Issue issue={issue} username={users && users.find(user => user._id === issue.userId) &&  users.find(user => user._id === issue.userId).username}/> 
        <EditIssueForm issue={issue} />{/*Use conditional rendering to hide this form*/}
        </>
        :null

    ))

    useEffect(() => getIssues(), [])

    return (
        <div>
            <h1>Welcome {username}!</h1>

            Your Issues
            {myIssues}
            
        </div>
    )
    
}