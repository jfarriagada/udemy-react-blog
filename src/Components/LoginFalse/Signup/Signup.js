// Less state component 
import React from 'react'
// redux form
import SignupForm from './SignupForm'
import SyncValidationForm from './SyncValidationForm'
// response
import axios from 'axios'
// pasar el state y eventos al components
import { connect } from 'react-redux'
// clear inputs
import { reset } from 'redux-form'

const Signup = (props) => {
    const fxForm = (input) => {
        axios.post('https://blog-api-u.herokuapp.com/users/', {
            user: {
                name: input.username,
                email: input.email,
                password: input.password,
                password_confirmation: input.password_confirmation               
            }
        })
        .then(function(response){
            console.log(response)
            // dispacth
            props.success()
        })
        .catch(function(error){
            console.log(error)
            props.error()
        })
    }
    
    return (
        <div>
            <h2>Registrarse</h2>
            <h4>{props.message.message}</h4>
            {/*<SignupForm onSubmit={fxForm}/>*/}
            <SyncValidationForm onSubmit={fxForm}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        message: state.user_status
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      success: () => {
          dispatch({type: 'USER_CREATED'})
          dispatch(reset('SignValidation'))
      },
      error: () => {
          dispatch({type: 'USER_ERROR'})
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)