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
    const [editFormState, setEditFormState] = useState(initEditFormState)
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
      
      const handleChange = (e) => {
          const {value, name} = e.target
          return setEditFormState(prevState => ({...prevState, [name]: value}))
   
       }

    const  editIssue = (e, issueId) =>{  
        e.preventDefault()
        userAxios.put(`/api/issues/${issueId}`, {...editFormState, userId: userState.user._id })
        .then(res => getIssues())
        .catch(err => console.log(err))


}

    const getComments = ()=> {
        userAxios.get("/api/comments/")
        .then(res => setComments(res.data))
        .catch(err => console.log(err))
    }


// const deleteUser = () => {

// }

    return (
        <UserContext.Provider value={{getIssues, issues, getUsers, editIssue, users, handleChange, getComments, comments}}>
            {props.children}
        </UserContext.Provider>
    )
}
export {UserContext, UserContextProvider}