import React, {useContext, useEffect, useState} from "react"
import Comment from "./Comment"

export default function Issue({issue, username, comments}){
    const [commentToggle, setCommentToggle] = useState(false)

    const renderedComments = comments && comments.map(comment => <Comment {...comment} />)
    
    return (
        
        <div>
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
            <img style={{width: "300px", height: "300px"}}  src={issue.imageUrl}/>
            <p>Created by @{username}</p>
            <button style={{display: "block"}} onClick={()=> setCommentToggle(prev => !prev)}>{commentToggle?"Hide":"Show"} Comment</button>
            {commentToggle?renderedComments:null}
        </div>
           
       
    )
    
}