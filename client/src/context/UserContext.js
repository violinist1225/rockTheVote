import React, {useEffect, useState} from "react"
import axios from "axios"

const UserContext = React.createContext()
const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

function UserContextProvider(props) {
    const initIssueFormState = {
        title: "",
        description: "",
        imageUrl: ""
    }
    const initEditFormState = {
        title: "",
        description: "",
        imageUrl: ""
    }
    const initUserState = {
        token: localStorage.getItem("token") || "",
        user: JSON.parse(localStorage.getItem("user")) || ""
    }
    const [userState, setUserState ] = useState(initUserState)
    const [issues, setIssues] = useState([])
    const [users, setUsers] = useState([])
    const [issueFormState, setIssueFormState] = useState(initIssueFormState)
    const [editFormState, setEditFormState] = useState(initEditFormState)
    const [commentFormState, setCommentFormState] = useState({text: ""})
    const [editCommentFormState, setEditCommentFormState] = useState({text: ""})
    const [comments, setComments] = useState([])

    const getIssues = () => {
        userAxios.get("/api/issues/")
        .then(res => setIssues(res.data))
        .catch(err => console.log(err))
    }

    const getUsers = () => {
        userAxios.get("/api/users/")
        .then(res => setUsers(res.data))
        .catch(err => console.log(err))
    }
      
      const editIssueHandleChange = (e) => {
          const {value, name} = e.target
          return setEditFormState(prevState => ({...prevState, [name]: value}))
   
       }

       const editCommentHandleChange = (e) => {
        const {value, name} = e.target
        return setEditCommentFormState(prevState => ({...prevState, [name]: value}))
 
     }

     const issueFormHandleChange = (e) => {
        const {value, name} = e.target
        return setIssueFormState(prevState => ({...prevState, [name]: value}))
     }

     const commentFormHandleChange = (e) => {
        const {value, name} = e.target
        return setCommentFormState(prevState => ({...prevState, [name]: value}))
     }

     const deleteIssue = (id) => {
        userAxios.delete(`/api/issues/${id}`)
        .then(res => getIssues())
        .catch(err => console.log(err))
     }

    const  editIssue = (e, issueId) =>{  
        e.preventDefault()
        userAxios.put(`/api/issues/${issueId}`, {...editFormState, userId: userState.user._id })
        .then(res => getIssues())
        .catch(err => console.log(err))


}
   const addIssue = (e, newIssue)=> {
        e.preventDefault()
        console.log("post ran")
        userAxios.post(`/api/issues/`, newIssue)
        .then(res => getIssues())
        .catch(err => console.log(err))
    }

    const getComments = ()=> {
        userAxios.get("/api/comments/")
        .then(res => setComments(res.data))
        .catch(err => console.log(err))
    }

    const addComment = (e, issueId) => {
        e.preventDefault()
        userAxios.post("/api/comments/", {...commentFormState, issueId: issueId, userId: userState.user._id})
        .then(res => getComments())
        .catch(err => console.log(err))
    }

    const deleteComment = (id) => {
       userAxios.delete(`/api/comments/${id}`)
       .then(res => getComments())
       .catch(err => console.log(err))
    }
    
    const  editComment = (e, commentId, issueId) =>{  
        e.preventDefault()
        userAxios.put(`/api/comments/${commentId}`, {...editCommentFormState, issueId: issueId, userId: userState.user._id })
        .then(res => getComments())
        .catch(err => console.log(err))


}

        const likeIssue = (likedIssue) => {
            userAxios.put(`/api/issues/likes/${likedIssue._id}`, likedIssue)
            .then(res => getIssues())
            .catch(err => console.log(err))
        }

        const dislikeIssue = (dislikedIssue) => {
            userAxios.put(`/api/issues/dislikes/${dislikedIssue._id}`, dislikedIssue)
            .then(res => getIssues())
            .catch(err => console.log(err))
        }

// const deleteUser = () => {

// }

    return (
        <UserContext.Provider 
        value={{
            getIssues, issues, getUsers, editIssue, users, editIssueHandleChange, getComments, comments, deleteComment, editCommentHandleChange, editComment, likeIssue, dislikeIssue, issueFormHandleChange, issueFormState, addIssue, deleteIssue, addComment, commentFormHandleChange, userState}}>
            {props.children}
        </UserContext.Provider>
    )
}
export {UserContext, UserContextProvider}