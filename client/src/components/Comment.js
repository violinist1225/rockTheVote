import React, {useContext, useState} from "react"
import {UserContext} from "../context/UserContext.js"
export default function Comment({text, _id}){
    const {deleteComment, editCommentFormState, editCommentHandleChange, editComment} = useContext(UserContext)
    const [editIsClicked, setEditIsClicked] = useState(false)
    

    console.log(text)
    return (
        <div>
            {text}
            {editIsClicked? 


            <form onSubmit={(e) => {
                editComment(e, _id)
                setEditIsClicked(prev => !prev)
                //toggle setEdit.. above to make form disappear after edits are submitted 
            }}>
                <input name="text" value={editCommentFormState ?editCommentFormState.text: null} onChange={editCommentHandleChange}/>
                <button>Submit</button>
                <button onClick={()=> setEditIsClicked(prev => !prev)}>Cancel</button>
                
            </form>


            :null}





            <button onClick={()=> deleteComment(_id)}>Delete Comment</button>


            {!editIsClicked? 

            <button onClick={()=> setEditIsClicked(prev => !prev)}>Edit Comment</button>
            
            :null}


        </div>
    )
    
}