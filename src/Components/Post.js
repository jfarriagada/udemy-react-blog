import React, { Component } from 'react'
// redux 
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'


class Post extends Component {
    // cuando el component entra al DOM
    componentDidMount = () => {
        this.props.post_id()
    }
    // cuando el component sale del DOM
    componentWillMount = () => {
        this.props.clear_state()
    }
    
    edit = () => {
        if (this.props.routerProps.match.params.user && this.props.error === null) {
            return(
                <div>
                    <Link to={`/${this.props.post.user_id}/post/${this.props.post.id}/edit`}>
                        Editar
                    </Link>
                    <button onClick={() => {this.props.delete(this.props.edit_post.id, this.props.session)}} >Eliminar</button>
                </div>
            )
        }
    }
    

    render() {
        return (
        <div>
            {this.edit()}
            <h4>{this.props.error}</h4>
            <h4>{this.props.msg_delete_post}</h4>
            <h4>{this.props.post.title}</h4>
            <h4>{this.props.post.body}</h4>
        </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        post : state.post,
        error : state.post_error,
        routerProps : ownProps,
        edit_post : state.edit_post,
        session : state.session,
        msg_delete_post : state.msg_delete_post
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        post_id: ()=> {
            console.log(ownProps)
            let id = parseInt(ownProps.match.params.id)
            axios.get(`https://blog-api-u.herokuapp.com/v1/posts/${id}`)
            .then(function(response){
                console.log(response)
                dispatch({type:'GET_POST', data: response.data})
            })
            .catch(function(error){
                console.log(error)
                dispatch({type:'ERROR_GET_POST'})
            })
        },
        clear_state: () =>{
            dispatch({type:'CLEAR_POST'})
        },
        delete: (id, session) =>{
            let config = {'Authorization':'Bearer' + session.jwt}
            axios.delete(`https://blog-api-u.herokuapp.com/v1/posts/${id}`,{
                headers : config    
            })
            .then(function(response){
                console.log(response)
                dispatch({type:'DELETE_POST'})
                setTimeout(function() {
                    ownProps.history.push(`/${session.id}/posts`)
                }, 2000) // 2 seg
            })
            .catch(function(error){
                console.log(error)
                dispatch({type:'ERROR_DELETED_POST'})
            })

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)