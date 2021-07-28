import React, {useContext, useEffect, useState} from "react"
import { UserContext } from "../context/UserContext"
import Comment from "./Comment"

export default function Issue({issue, username, comments}){
    const [commentToggle, setCommentToggle] = useState(false)
    const {likeIssue, dislikeIssue } = useContext(UserContext)

    const renderedComments = comments && comments.map(comment => <Comment {...comment} />)
    
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
            {commentToggle?renderedComments:null}
        </div>
           
       
    )
    
}