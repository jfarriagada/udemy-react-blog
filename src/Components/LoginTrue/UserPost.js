import React, { Component } from 'react'
// redux
import { connect } from 'react-redux'
import axios from 'axios'
// routing
import { Link } from 'react-router-dom'


class UserPost extends Component {

    componentDidMount(){
      this.props.getPosts(this.props.login.id, this.props.login.jwt)
    }

    componentWillMount(){
      this.props.clear()
    }

    posts = ()=> {
      var user_posts
      if (this.props.post_user.length !== 0) {
        user_posts = this.props.post_user.map((p)=>{
          return (
            <Link to={`/${p.user_id}/post/${p.id}`} key={p.id}><p>{p.title}</p></Link>
          )
        })
      } else {
        user_posts = null
      }
      return user_posts
    }

    render() {
        return (
        <div>
            <h2>Mis Post</h2>
            <Link to={`/${this.props.login.id}/create`}>Crear Post</Link>
            <Link to=''>Lista Posts</Link>
            {this.posts()} <br/>
            {this.props.error_post_user}
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.session,
        post_user: state.post_user,
        error_post_user: state.error_post_user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getPosts: (user_id, token) => {
        let config = {'Authorization':'Bearer' + token}
        axios.get(`https://blog-api-u.herokuapp.com/users/${user_id}/posts`,
          { headers: config}
        )
        .then(function(response){
          console.log(response)
          dispatch({type:'USER_POSTS', data:response.data.posts})
        })
        .catch(function(error){
          console.log(error)
          dispatch({type:'ERROR_USER_POSTS'})
        })
      },
      clear: () => {
        dispatch({type:'CLEAR_USER_POSTS'})
      }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(UserPost)
