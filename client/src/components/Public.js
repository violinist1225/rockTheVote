import React, {useContext, useEffect} from "react"
import {UserContext} from "../context/UserContext.js"
import Comments from "./Comment"
import EditIssueForm from "./EditIssueForm.js"
import Issue from "./Issue.js"
export default function Public(){
    const {issues, getIssues, users, getUsers, comments, getComments} = useContext(UserContext)
    const renderedIssues = issues.map(issue => (
        <>
        <Issue issue={issue} 
        username={users && users.find(user => user._id === issue.userId) &&  users.find(user => user._id === issue.userId).username}
        comments={comments && comments.map(comment => issue._id === comment.issueId? comment: null )}
        /> 
        </>

    ))
    console.log(comments)
    useEffect(() => {
         getIssues()
         getUsers()
         getComments()
         return
    }, [])
    return (
        <div>
            <h1>Public Posts</h1>
            {renderedIssues}
           
        </div>
    )
    
}