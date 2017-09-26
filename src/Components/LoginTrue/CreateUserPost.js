import React, { Component } from 'react'
// redux 
import { connect } from 'react-redux'
import axios from 'axios'
// Components
import PostForm from './PostForm'


const CreateUserPost = (props) => {
    const form = (data) => {
        console.log(data)
        console.log(props.login.jwt)
        let config = {'Authorization':'Bearer' + props.login.jwt}

        axios.post('https://blog-api-u.herokuapp.com/v1/posts', 
            {
                post: {
                    title: data.title,
                    body: data.body
                }
            }, 
            {
                headers: config
            }
        )
        .then(function(response){
            console.log(response)
            props.create()
        })
        .catch(function(error){
            console.log(error)
            props.error()
        })
    }

    return (
        <div>
            <h2>Crear Post</h2>
            <h4>{props.created}</h4>
            <PostForm onSubmit={form}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.session,
        created: state.post_created
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        create: () => {
            dispatch({type:'CREATED_POST'})
        },
        error: () => {
            dispatch({type:'ERROR_CREATED_POST'})
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserPost)
