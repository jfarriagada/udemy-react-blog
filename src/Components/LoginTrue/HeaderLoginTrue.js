import React from 'react'
import { Link } from 'react-router-dom'
// connect
import { connect } from 'react-redux'

const Header = (props) => {
  return (
    <nav>
      <Link to='/'> Home </Link>
      <Link to={`/${props.login.id}/posts`}> Mis Post </Link>
      <Link to='/' onClick={props.logout}> Logout </Link>
    </nav>
  )
}


const mapStateToProps = (state) => {
    return {
        login : state.session
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => {
          dispatch({type: 'LOGOUT'})
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)