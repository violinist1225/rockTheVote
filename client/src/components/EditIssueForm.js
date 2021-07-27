import React, {useContext, useState} from "react"
import {UserContext} from "../context/UserContext"



export default function EditIssueForm(props) {
  const {handleChange, editFormState, editIssue} = useContext(UserContext)


    return (
        <form onSubmit={(e) => editIssue(e, props.issue._id)}>
            <input name="title" value={editFormState && editFormState.title} onChange={handleChange}/>
            <input name="description" value={editFormState && editFormState.description} onChange={handleChange} />
            <input name="imageUrl" value={editFormState && editFormState.imageUrl} onChange={handleChange}/>
            <button>Submit</button>
        </form>
    )
} 
 
