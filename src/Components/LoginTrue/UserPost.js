import React, { Component } from 'react'
// redux 
import { connect } from 'react-redux'
import axios from 'axios'
// routing
import { Link } from 'react-router-dom'


class UserPost extends Component {

    render() {
        return (
        <div>
            <h2>Mis Post</h2>
            <Link to={`/${this.props.login.id}/create`}>Crear Post</Link>
            <Link to=''>Lista Posts</Link>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserPost)
