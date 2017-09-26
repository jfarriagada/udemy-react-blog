// Less state component 
import React, { Component } from 'react'
// redux 
import { connect } from 'react-redux'
// request server
import axios from 'axios'
// routing
import { Link } from 'react-router-dom'
// Components
import Pagination from '../Pagination'


class Home extends Component {
    // solo se ejecuta una vez, ideal para cargar request del server
    componentDidMount = () => {
      this.props.dispatch1()
    }
    // se limpia la data para que no se repita la data al navegar en el nav
    componentWillUnmount = () => {
      this.props.clear()
    }
    
    
    allPosts = () => {
        const posts = this.props.allPosts.map((post) => {
            return (
                <Link to={`/post/${post.id}`} key={post.id}>
                    <h4 key={post.id}>{post.title}</h4>
                </Link>
            )
        })
        return posts
    }

    render(){
        //this.allPosts()
        return (
            <div>
                <h2>home</h2>
                {this.allPosts()}
                <Pagination />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        allPosts: state.allPosts
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      dispatch1: () => {
        axios.get('https://blog-api-u.herokuapp.com/v1/posts')
        // promises
        .then(function(response){
            console.log(response)
            dispatch({
                type: "DATA_LOADED", 
                data: response.data
            })
        })
        .catch(function(error){
            console.log(error)
        })
    },
    clear: () => {
        dispatch({
            type: "DATA_CLEAR"
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)