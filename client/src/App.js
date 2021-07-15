import logo from './logo.svg';
import './App.css';
import AuthPage from "./authorization/AuthPage.js"
// import Navbar from './components/Navbar.js'
// import Auth from './components/Auth.js'
// import Profile from './components/Profile.js'
// import Public from './components/Public.js'


function App() {
  return (
    <div className="app">
      {token && <Navbar logout={logout} />}
      <Switch>
        <Route 
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
        />
      </Switch>
    </div>
    
  );
}

export default App;

