import React, { Component } from 'react'
// redux 
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import PostEditForm from './LoginTrue/PostEditForm'


class EditPost extends Component {

    componentWillUnmount(){
        this.props.clear_edit()
    }
    

    form = (data) => {
        console.log(data)
        this.props.edit(data, this.props.edit_post.id, this.props.session.jwt)
    }

    render() {
        return (
            <div>
                <h4>Editar</h4>
                <p>{this.props.msg_edit_post}</p>
                <PostEditForm onSubmit={this.form} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        edit_post : state.edit_post,
        session : state.session,
        msg_edit_post : state.msg_edit_post
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clear_edit: () => {
            dispatch({type: 'CLEAR_EDIT_POST'})
        },
        edit: (data, id, token) => {
            let config = {'Authorization':'Bearer' + token}
            axios.patch(`https://blog-api-u.herokuapp.com/v1/posts/${id}`, {
                post: {
                    title: data.title,
                    body: data.body
                }
            },
            { headers : config}
            )
            .then(function(response){
                console.log(response)
                dispatch({type: 'EDITED_POST'})
            })
            .catch(function(error){
                console.log(error)
                dispatch({type: 'ERROR_EDITED_POST'})
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)