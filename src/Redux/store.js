import { createStore, combineReducers } from 'redux'
// redux form
import { reducer as formReducer } from 'redux-form'

// reducers que devuelven un nuevo estado

const allPosts = (state=[], action) => {
    var new_state = Object.assign({}, state)
    switch (action.type) {
        case 'DATA_LOADED':
            // logic
            new_state = action.data
            return new_state
        case 'DATA_CLEAR':
            new_state = []
            return new_state
        default:
            return state
    }
}

const user_created = (state = {},action) => {
    var new_state = Object.assign({}, state)
    switch (action.type) {
        case 'USER_CREATED':
            new_state = { message: 'Usuario creado exitosamente.'}
            return new_state
        case 'USER_ERROR':
            new_state = { message: 'Error: El Usuario no se ha podido crear'}
            return new_state
        default:
            return state
    }
}

// default state = null para que por defecto no este logueado
const session = (state = null, action) => {
    var new_state = Object.assign({}, state)
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            new_state = action.data
            return new_state
        case 'LOGIN_ERROR':
            new_state = { message: 'Error: Usuario y/o Contraseña incorrectos.'}
            return new_state
        case 'LOGOUT':
            new_state = null
            return new_state
        default:
            return state
    }
}

const pagination = (state = {total: 1, page: 1}, action) => {
    var new_state = Object.assign({}, state)

    switch (action.type) {
        case 'SET_CURRENT':
            new_state.page = action.page
            return new_state
        case 'SET_TOTAL':
            new_state.total = action.total
            return new_state
        default:
            return state
        }
}

const post = (state = {}, action) => {
    var new_state = Object.assign({}, state)

    switch (action.type) {
        case 'GET_POST':
            new_state = action.data
            return new_state
        // es una buena práctica limpiar el state cuando ya no se esta ocupando
        case 'CLEAR_POST':
            new_state = {}
            return new_state
        default:
            return state
        }
}

// Para estos errores que solo que quieren mostrar una sola vez
// es recomendable dejar el state default null
const post_error = (state=null, action) => {
    var new_state = Object.assign({}, state)

    switch (action.type) {
        case 'ERROR_GET_POST':
            new_state = { error: 'Error al cargar el Post.'}
            console.log("error post")
            return new_state.error
        default:
            return null
        }
}

const post_created = (state=null, action) => {
    var new_state = Object.assign({}, state)

    switch (action.type) {
        case 'CREATED_POST':
            new_state = 'Post creado con éxito.'
            return new_state
        case 'ERROR_CREATED_POST':
            new_state = 'Error al crear el Post.'
            return new_state
        default:
            return null
        }
}

const post_user = (state=[], action) => {
    var new_state = Object.assign({}, state)

    switch (action.type) {
        case 'USER_POSTS':
            new_state = action.data
            return new_state
        case 'CLEAR_USER_POSTS':
            new_state = []
            return new_state
        default:
            return state
        }
}

const error_post_user = (state=null, action) => {
    var new_state = Object.assign({}, state)

    switch (action.type) {
        case 'ERROR_USER_POSTS':
            new_state = 'Error al cargar los Posts o no tiene Posts.'
            return new_state
        default:
            return null
    }
}

const reducer = combineReducers({
    allPosts: allPosts,
    form: formReducer,
    user_status : user_created,
    session: session,
    pagination : pagination,
    post : post,
    post_error : post_error,
    post_created: post_created,
    post_user,
    error_post_user
})

const store = createStore(reducer)

export default store
