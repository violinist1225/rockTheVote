import React, {useContext} from "react"
import AuthPage from "./authorization/AuthPage.js"
import {Route, Switch, Redirect } from "react-router-dom"
import {AuthContext} from "./context/AuthContext.js"
//  import Navbar from './components/Navbar.js'
// import Auth from './components/Auth.js'
import Profile from './components/Profile.js'
import Public from './components/Public.js'

function App() {
  const {token} = useContext(AuthContext)
  return (
    <div className="app">
      {/* {token && <Navbar logout={logout} />} */}
      <Switch>
        {/* <Route 
          exact path="/" 
          render={()=> token ? <Redirect to= "/profile"/> : <Auth />} 
          />
        
        <Route 
          path="/profile"
          render={() => <Profile />}
        />
        <Route 
          path="/public"
          render={() => <Public />}
        /> */}
        /* <Route 
          exact path="/" 
          render={()=> !token ? <AuthPage /> : <Profile />}  //use Redirect in this ternary!
          />
          <Route
          exact path="/public"
          render={() => !token ? <AuthPage />: <Public />}  //use Redirect in this ternary!
          />
      </Switch>
    </div>
    
  );
}

export default App;

