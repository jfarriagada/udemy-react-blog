import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'


const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Requerido'
  } else if (values.title.length > 25) {
    errors.title = 'Maximo 25 caracteres'
  }
  if (!values.body) {
    errors.body = 'Requerido'
  } else if (values.body.length > 700) {
    errors.body = 'Maximo 700 caracteres'
  }
  return errors
}

// El renderField itera sobre cada elemento del form
// por el component que se pasa en el Field 'component={renderField}'
const renderField = ({ input, label, type, meta: { touched, error, warning }}) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error &&
          <span>
            <br/>{error}
          </span>))}
    </div>
  </div>

// Body
const renderText = ({ input, label, type, meta: { touched, error, warning }}) =>
<div>
  <label>
    {label}
  </label>
  <div>
    <textarea {...input} placeholder={label} type={type} > </textarea>
    {touched &&
      ((error &&
        <span>
          <br/>{error}
        </span>))}
  </div>
</div>

let PostEditForm = props => {
  const { handleSubmit, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="title" type="text" component={renderField} label="Titulo" />
      <Field name="body" type="text" component={renderText} label="Texto" />
      <div>
        <button type="submit" disabled={submitting}>
          Enviar
        </button>
      </div>
    </form>
  )
}


PostEditForm = reduxForm({
  form: 'PostEditForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(PostEditForm)

// Pasar el state "edit_post" a este form para que tenga la información 
// del post para ser editado

PostEditForm = connect(
  (state) => ({
    initialValues: {
      title: state.edit_post.title,
      body : state.edit_post.body
    }
  })
)(PostEditForm)

export default PostEditForm
