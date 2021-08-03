import React, {useContext, useEffect, useState} from "react"
import {UserContext} from "../context/UserContext.js"
import CommentForm from "./CommentForm"
import EditIssueForm from "./EditIssueForm.js"
import Issue from "./Issue.js"
export default function Public(){
    const {issues, getIssues, users, getUsers, comments, getComments} = useContext(UserContext)
    const [hideCommentForm, setHideCommentForm ] = useState(true)
    const renderedIssues = issues.map(issue => (
        <>
        <Issue issue={issue} 
        username={users && users.find(user => user._id === issue.userId) &&  users.find(user => user._id === issue.userId).username}
        comments={comments && comments.filter(comment => issue._id === comment.issueId )}
        /> 
        {hideCommentForm?<button onClick={() => setHideCommentForm(prevState => !prevState)}>Comment</button>:<CommentForm issueId={issue._id} setHideCommentForm={setHideCommentForm} />}
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