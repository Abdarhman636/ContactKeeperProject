import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

export const Register = props => {
     const alertContext = useContext(AlertContext)
     const authContext = useContext(AuthContext)

     const { setAlert } = alertContext
     const { register, error, clearErrors, isAuthenticated } = authContext

     useEffect(() => {
          if (isAuthenticated) {
               props.history.push('/')
          }

          if (error === 'User already exists') {
               setAlert(error, 'danger')
               clearErrors()
          }

          // eslint-disable-next-line
     }, [error, isAuthenticated, props.history])


     const [user, setUser] = useState({
          name: '',
          email: '',
          passwoed: '',
          password2: ''
     })

     const { name, email, password, password2 } = user

     const onChange = (e) => {
          setUser({ ...user, [e.target.name]: e.target.value })
     }

     const onSubmit = e => {
          e.preventDefault()
          if (name === '' || password === '' || email === '') {
               setAlert('Please enter all fildes', 'danger')
          } else if (password !== password2) {
               setAlert('Password do not match', 'danger')
          }
          else if (password.length < 6) {
               setAlert('the password must be more than 6 letters', 'danger')
          } else {
               register({ name, email, password })
          }
     }

     return (
          <div className='form-container'>
               <h1>Account <span className='text-primary'></span>Register</h1>
               <form onSubmit={onSubmit}>
                    <div className='form-group'>
                         <label htmlFor='name'>Name</label>
                         <input type='text' name='name' value={name} onChange={onChange}></input>
                    </div>
                    <div className='form-group'>
                         <label htmlFor='email'>Email</label>
                         <input type='email' name='email' value={email} onChange={onChange}></input>
                    </div>
                    <div className='form-group'>
                         <label htmlFor='password'>password</label>
                         <input type='password' name='password' value={password} onChange={onChange}></input>
                    </div>
                    <div className='form-group'>
                         <label htmlFor='password2'>Confirm password</label>
                         <input type='password' name='password2' value={password2} onChange={onChange}></input>
                    </div>
                    <input type='submit' value='Register' className='btn btn-block btn-primary' />
               </form>
          </div>
     )
}

export default Register
