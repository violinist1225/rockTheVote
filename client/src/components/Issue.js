import React, {useContext, useEffect, useState} from "react"
import { UserContext } from "../context/UserContext"
import Comment from "./Comment"

export default function Issue({issue, username, comments, setHideEditForm}){
    const [commentToggle, setCommentToggle] = useState(false)
    const {likeIssue, dislikeIssue, deleteIssue, user} = useContext(UserContext)

    const renderedComments = comments && comments.map(comment => <Comment issueId={issue._id} {...comment} />)
    
    return (
        
        <div>
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
            <img style={{width: "300px", height: "300px"}}  src={issue.imageUrl}/>
            <p>Likes: {issue.likes}</p>
            <p>Dislikes: {issue.dislikes}</p>
            <p>Created by @{username}</p>
            <button style={{display: "block"}} onClick={()=> setCommentToggle(prev => !prev)}>{commentToggle?"Hide":"Show"} Comment</button>
            <button onClick={() => likeIssue(issue)}>Like</button>
            <button onClick={() => dislikeIssue(issue)}>Dislike</button>
            {user}
            {commentToggle?renderedComments:null}
            {setHideEditForm === undefined?
            null
            :
            <>
            <button onClick= {() => deleteIssue(issue._id)}>Delete</button>
            <button onClick={()=> setHideEditForm(prevState => !prevState)} >Edit</button>
            </>
            }
        </div>
           
       
    )
    
}