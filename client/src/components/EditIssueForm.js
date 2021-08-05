import React, {useContext, useEffect, useState} from "react"
import {UserContext} from "../context/UserContext"



export default function EditIssueForm(props) {
  const {editIssueHandleChange, editFormState, editIssue, setEditFormState} = useContext(UserContext)

    useEffect(() => setEditFormState({title: props.isssue.title, description: props.isssue.description, imageUrl: props.issue.imageUrl}), [])
    return (
        <>
        <form 
        onSubmit=
        {(e) => {
            editIssue(e, props.issue._id)
            props.setHideEditForm(prevState => !prevState)
            }}>
                
            <input name="title" value={editFormState && editFormState.title} onChange={editIssueHandleChange}/>
            <input name="description" value={editFormState && editFormState.description} onChange={editIssueHandleChange} />
            <input name="imageUrl" value={editFormState && editFormState.imageUrl} onChange={editIssueHandleChange}/>
            <button>Submit</button>
        </form>
        <button onClick={() => props.setHideEditForm(prevState => !prevState) }>Cancel</button>
        </>
    )
} 
 
