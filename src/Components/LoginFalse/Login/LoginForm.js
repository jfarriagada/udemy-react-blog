import React from 'react'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Requerido'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email incorrecto.'
  }
  if (!values.password) {
    errors.password = 'Requerido'
  } else if (values.password.length < 7) {
    errors.password = 'Minímo 7 caracteres'
  }
  return errors
}

// El renderField itera sobre cada elemento del form 
// por el component que se pasa en el Field 'component={renderField}'
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) =>
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

const LoginForm = props => {
  const { handleSubmit, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" type="email" component={renderField} label="Email" />
      <Field name="password" type="password" component={renderField} label="Contraseña" />
      <div>
        <button type="submit" disabled={submitting}>
          Enviar
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'LoginValidation', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(LoginForm)
