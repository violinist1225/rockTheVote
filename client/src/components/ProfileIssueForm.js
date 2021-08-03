import React, {useContext, useState} from "react"
import {UserContext} from "../context/UserContext"
import Profile from "./Profile"




export default function ProfileIssueForm(props) {
  const {issueFormHandleChange, issueFormState, addIssue } = useContext(UserContext)


    return (
        <div>





        <form onSubmit={(e) => addIssue(e, issueFormState)}>
            <input placeholder= "TITLE" name="title" value={issueFormState && issueFormState.title} onChange={issueFormHandleChange}/>
            <input placeholder= "DESCRIPTION"name="description" value={issueFormState && issueFormState.description} onChange={issueFormHandleChange} />
            <input placeholder= "IMAGE URL" name="imageUrl" value={issueFormState && issueFormState.imageUrl} onChange={issueFormHandleChange}/>
            <button>SUBMIT</button>
        </form>
        </div>
    )
}