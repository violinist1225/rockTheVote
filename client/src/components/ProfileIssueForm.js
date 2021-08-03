import React, {useContext, useState} from "react"
import {UserContext} from "../context/UserContext"



export default function ProfileIssueForm(props) {
  const {issueFormHandleChange, issueFormState, addIssue } = useContext(UserContext)


    return (
        <div>
        <form onSubmit={(e) => addIssue(e, issueFormState)}>
            <input name="title" value={issueFormState && issueFormState.title} onChange={issueFormHandleChange}/>
            <input name="description" value={issueFormState && issueFormState.description} onChange={issueFormHandleChange} />
            <input name="imageUrl" value={issueFormState && issueFormState.imageUrl} onChange={issueFormHandleChange}/>
            <button>Submit</button>
        </form>
        </div>
    )
}