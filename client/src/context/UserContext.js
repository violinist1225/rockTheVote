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
    const [issues, setIssues] = useState([])
    const getIssues = () => {
        userAxios.get("/api/issue/")
        .then(res =>console.log(res.data))
        .catch(err => console.log(err))
    }
    useEffect(() => getIssues, [])
    return (
        <UserContext.Provider value={{getIssues, issues}}>
            {props.children}
        </UserContext.Provider>
    )
}
export {UserContext, UserContextProvider}