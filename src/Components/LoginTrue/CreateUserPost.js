import React, { Component } from 'react'
// redux 
import { connect } from 'react-redux'
import axios from 'axios'


class CreateUserPost extends Component {

    render() {
        return (
        <div>
            <h2>Crear Post</h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserPost)
