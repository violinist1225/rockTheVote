import React, {useState} from "react"
import axios from "axios"
import AuthPage from "./AuthPage.js"

const AuthContext = React.createContext()

function AuthContextProvider(props) {
    const initState = {
        username: "",
        password: ""
    }
    const [formState, setFormState] = useState(initState)

   const handleChange = (e) => {
       const {value, name} = e.target
       return setFormState(prevState => ({...prevState, [name]: value}))

    }

    const handleSignUp = (e) => {
        e.preventDefault()
       // const {value} = e.target
        
         console.log("Submitting...")
         axios.post("auth/signup/", formState)
         .then(res => {
            setFormState(initState)
             return console.log(res.data)
            })
         .catch(err => console.log(err))
    //      setTimeout(() => {
    //          history.push({pathname:"/AuthPage",  issue})
    //      }, 2000)
    // }
    
}

const handleLogin = () => {
    console.log("Submitting...")
    axios.post("auth/login/", formState)
    .then(res => {
       setFormState(initState)
        return console.log(res.data)
       })
    .catch(err => console.log(err))

}


    return (
       <AuthContext.Provider value={{formState, handleChange, handleSignUp}}>
           {props.children}

        </AuthContext.Provider>
    )
}

export {AuthContextProvider, AuthContext}