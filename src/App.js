import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
// Components
import Home from './Components/LoginFalse/Home'
import Signup from './Components/LoginFalse/Signup/Signup'
import Login from './Components/LoginFalse/Login/Login'
import HeaderLoginTrue from './Components/LoginTrue/HeaderLoginTrue'
import Post from './Components/Post'
import UserPost from './Components/LoginTrue/UserPost'
import CreateUserPost from './Components/LoginTrue/CreateUserPost'
// connect
import { connect } from 'react-redux'


// False Login Header
const HeaderLoginFalse = () => {
    return (
      <nav>
        <Link to='/'> Home </Link>
        <Link to='/signup'> Sign Up </Link>
        <Link to='/login'> Login </Link>
      </nav>
    )
}


// less state component (nfn tab)
// Route exact toma exactamente '/' y no se repite en el render nav
const App = (props) => {
  
  if (props.login !== null && props.login.message === undefined) {
    // True Login router
    console.log("logueado")
    console.log(props.login)
    console.log(props.login.message)
    return(
      <Router>
        <div>
            <HeaderLoginTrue/>
            <h2>Logueado</h2>
            <Route exact path='/' component={Home} />
            <Route exact path='/post/:id' component={Post} />
            <Route path='/:user/posts' component={UserPost} />
            <Route path='/:user/create' component={CreateUserPost} />
        </div>
      </Router>
    )
  } else {
    // False login router
    return(
      <Router>
        <div>
            <HeaderLoginFalse/>
            <Route exact path='/' component={Home} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <Route exact path='/post/:id' component={Post} />
            <h2>No Logueado</h2>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        login: state.session
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
