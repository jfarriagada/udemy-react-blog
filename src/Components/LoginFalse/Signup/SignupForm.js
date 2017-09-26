import React from 'react'
// redux form
import { Field, reduxForm} from 'redux-form'

let SignupForm = (props) => {
    const { handleSubmit } = props
    return(
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">Nombre</label>
            <Field name="name" component="input" type="text" />
        </div>
        <div>
            <label htmlFor="lastname">Apellido</label>
            <Field name="lastname" component="input" type="text" />
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <Field name="email" component="input" type="email" />
        </div>
        <button type="submit">Enviar</button>
        </form>
    )
}

SignupForm = reduxForm({
    form: 'post'
})(SignupForm)

export default SignupForm