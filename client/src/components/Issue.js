import React, {useContext, useEffect, useState} from "react"
import { UserContext } from "../context/UserContext"
import CommentForm from "./CommentForm"
import Comment from "./Comment"
import EditIssueForm from "./EditIssueForm.js"

import "../styles/issue.css"
export default function Issue({issue, username, comments, onProfilePage}){
    const [commentToggle, setCommentToggle] = useState(false)
    const [hideCommentForm, setHideCommentForm ] = useState(true)
    const [hideEditForm, setHideEditForm ] = useState(true)
    const {likeIssue, dislikeIssue, deleteIssue, user} = useContext(UserContext)

    const renderedComments = comments && comments.map(comment => <Comment issueId={issue._id} {...comment} />)
    
    return (
        <> 
         <div>
        
        
        <div className="profile-body">
          <div className="photo">
            <img src={issue.imageUrl === undefined?`https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`:issue.imageUrl} alt="Image Not Found"   className="image--cover" />
          </div>
          <div className="profile">
            <div id="rating-stars" align="center">
              <div className="stars">
                <label aria-label="first-star" className="star-label" htmlFor="rate-1"><i className="rate-icon star-icon fa fa-star" /></label>
                <input className="rate-input" name="rating" id="rate-1" defaultValue={1} type="radio" />
                <label aria-label="second-star" className="star-label" htmlFor="rate-2"><i className="rate-icon star-icon fa fa-star" /></label>
                <input className="rate-input" name="rating" id="rate-2" defaultValue={2} type="radio" />
                <label aria-label="third-star" className="star-label" htmlFor="rate-3"><i className="rate-icon star-icon fa fa-star" /></label>
                <input className="rate-input" name="rating" id="rate-3" defaultValue={3} type="radio" />
                <label aria-label="fourth-star" className="star-label" htmlFor="rate-4"><i className="rate-icon star-icon fa fa-star" /></label>
                <input className="rate-input" name="rating" id="rate-4" defaultValue={4} type="radio" />
                <label aria-label="fifth-star" className="star-label" htmlFor="rate-5"><i className="rate-icon star-icon fa fa-star" /></label>
                <input className="rate-input" name="rating" id="rate-5" defaultValue={5} type="radio" />
              </div>
            </div>
            <h1 className="username">{issue.title}</h1>
            {onProfilePage ? null: <h2 className="profession"> Created by @{username}</h2>}
        
            <p className="descricao">{issue.description}</p>
            <div className="socialmedia">
                
              <div><a onClick={(e) => { 
                  e.preventDefault()
                  likeIssue(issue)}} href="#" className="button-twitter"><i className="fa fa-thumbs-up" /></a>
                {issue.likes} 
                </div>
              <div><a onClick={(e) => { 
                  e.preventDefault()
                  dislikeIssue(issue)}} href="#" className="button-whatsapp"><i className="fa fa-thumbs-down" /></a>
              {issue.dislikes}</div>
            </div>
          </div>
        </div></div> 
        <div>
            
           {onProfilePage? null : <button style={{display: "block"}} onClick={()=> setCommentToggle(prev => !prev)}>{commentToggle?"Hide":"Show"} Comment</button>}
            {user}
            {commentToggle?renderedComments:null}
            {setHideEditForm?
            null
            :
            <>
            <button onClick= {() => deleteIssue(issue._id)}>Delete</button>
            <button onClick={()=> setHideEditForm(prevState => !prevState)} >Edit</button>
            </>
            }
              {onProfilePage?null:hideCommentForm?<button onClick={() => setHideCommentForm(prevState => !prevState)}>Comment</button>:<CommentForm issueId={issue._id} setHideCommentForm={setHideCommentForm} />}
              
            {
            hideEditForm?
            null:
            <>
            <EditIssueForm issue={issue} setHideEditForm={setHideEditForm} />{/*Use conditional rendering to hide this form*/}
            </>
            }
        </div>
         </>  
       
    )
    
}