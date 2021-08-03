import React, {useState} from "react"
import axios from "axios"

const AuthContext = React.createContext()

function AuthContextProvider(props) {
    const initState = {
        signupUsername: "",
        signupPassword: "",
        loginUsername: "",
        loginPassword: ""

    }
    const initUserState = {
        token: localStorage.getItem("token") || "",
        user: JSON.parse(localStorage.getItem("user")) || ""
    }
    const [formState, setFormState] = useState(initState)
    const [userState, setUserState ] = useState(initUserState)
 
   const handleChange = (e) => {
       const {value, name} = e.target
       return setFormState(prevState => ({...prevState, [name]: value}))

    }

    const handleSignUp = (e) => {
        e.preventDefault()
       // const {value} = e.target
        
         console.log("Submitting...")
         axios.post("auth/signup/",  {username: formState.signupUsername, password: formState.signupPassword})
         .then(res => {
            setFormState(initState)
            console.log(res.data)
             const {user, token} = res.data
             localStorage.setItem("token", token)
             localStorage.setItem("user", JSON.stringify(user))
             return
            })
         .catch(err => console.log(err))
    
}

const handleLogin = (e) => {
    e.preventDefault()
    console.log("Submitting...")
    axios.post("auth/login/", {username: formState.loginUsername, password: formState.loginPassword})
    .then(res => {
       setFormState(initState)
       setUserState(prevState => {
           return {
               ...prevState,
               token: res.data.token
           }
       })
       console.log(res.data)
       const {user, token}= res.data
       localStorage.setItem("token", token)
       localStorage.setItem("user", JSON.stringify(user))
        return
       })
    .catch(err => console.log(err))

}

const handleLogout = (e) => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
        user: {},
        token: "",
        issues:[]

    })
}


    return (
       <AuthContext.Provider value={{formState, handleChange, handleSignUp, handleLogout, handleLogin, ...userState}}>
           {props.children}

        </AuthContext.Provider>
    )
}

export {AuthContextProvider, AuthContext}