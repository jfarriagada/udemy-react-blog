// Less state component 
import React from 'react'
// redux-form validation
import LoginForm from './LoginForm'
import axios from 'axios'
// pasar el state y eventos al components
import { connect } from 'react-redux'

const Login = (props) => {
    const fxForm = (input) => {
        console.log(input)
        axios.post('https://blog-api-u.herokuapp.com/v1/login', {
            login : {
                email: input.email,
                password: input.password
            }
        })
        .then(function(response){
            console.log(response)
            props.login(response.data)
            // redirect home
            props.history.push('/')
        })
        .catch(function(error){
            console.log(error)
            props.error()
        })
    }

    if (props.message != null) {
        return (
            <div>
                <h2>Login</h2>
                <h4>{props.message.message}</h4>
                <LoginForm onSubmit={fxForm} />
            </div>
        )
    } else {
        return (
            <div>
                <h2>Login</h2>
                <LoginForm onSubmit={fxForm} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.session
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      login: (inputs) => {
          dispatch({type: 'LOGIN_SUCCESS', data: inputs})
      },
      error: () => {
          dispatch({type: 'LOGIN_ERROR'})
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)