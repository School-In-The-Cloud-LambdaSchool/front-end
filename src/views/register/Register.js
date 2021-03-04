import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import * as yup from 'yup'
import '../../css/Register.css'

const formSchemaSV = yup.object().shape({
  username: yup.string()
    .trim()
    .required('username is required')
    .min(5, 'username must be at least 5 characters long'),
  firstName: yup.string()
    .trim()
    .required('First Name is required')
    .min(2, 'First Name must be at least 2 characters long'),
  lastName: yup.string()
    .trim()
    .required('Last Name is required')
    .min(2, 'Last Name must be at least 2 characters long'),
  password: yup.string()
    .trim()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters long'),
  role: yup.string().required('Please select a role')
})

const formSchemaAdmin = yup.object().shape({
  username: yup.string()
    .trim()
    .required('username is required')
    .min(5, 'username must be at least 5 characters long'),
  password: yup.string()
    .trim()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters long'),
  adminCode: yup.string()
    .trim()
    .required('You must provide an admin code'),
  role: yup.string().required('Please select a role')
})

const initialState = {
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    adminCode: '',
    role: ''
}

const initialFormErrors = {
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    adminCode: '',
    role: ''
}

const Register = (props) => {
    // states
    const [user, setUser] = useState(initialState);
    const [disabled, setDisabled] = useState(true);
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    const [registered, setRegistered] = useState(false)
    
    const { push } = useHistory()

    // form validation; disabled button
    useEffect(() => {
      let isMounted = true;
      let formSchema = user.role === 'admin'
        ? formSchemaAdmin
        : formSchemaSV
    
      formSchema.isValid(user).then(valid => setDisabled(!valid))
      return () => isMounted = false;
    }, [user])

    
    // event handlers
    const onChange = evt => {
        const { name, value } = evt.target
        setUser({...user, [name]: value})
        
        const validateForm = (schema, name, value ) => {  
            yup.reach(schema, name)
              .validate(value)
              .then(() => {
                // success
                setFormErrors({ ...formErrors, [name]: '' })
              })
              .catch(err => {
                // failure
                setFormErrors({ ...formErrors, [name]: err.errors[0] })
              })
        }

        if(user.role === "admin"){
            validateForm(formSchemaAdmin, name, value)
        } else {
            validateForm(formSchemaSV, name, value)
        }
        
    }

    const onSubmit = evt => {
        evt.preventDefault()
        
        const newUser = {
            username: user.username.trim(),
            password: user.password.trim(),
        }
        
        if(user.role === 'student' || user.role ==='volunteer'){
            newUser.firstName = user.firstName.trim()
            newUser.lastName = user.lastName.trim()
        }
        
        if(user.role === 'admin'){
            newUser.adminCode = user.adminCode.trim()
        }
        
        axios.post(`https://school-in-the-cloud-tt16.herokuapp.com/api/auth/register-${user.role}`, newUser)
          .then(res => {
            console.log('registered')
            console.log(res)
            setRegistered(true)
            setTimeout(() => {
              push('/login')
            }, 3000);
          })
          .catch(err => {
            console.log('failed to register')
            console.log(err)
          })

    }

    return (
        <div className="registration-form">
          <form onSubmit={onSubmit}>
            <select name="role" onChange={onChange} value={user.role} className="form-group">
                <option value=""> --- What is your Role? --- </option>
                <option value="student">Student</option>
                <option value="volunteer">Volunteer</option>
                <option value="admin">Administrator</option>
            </select>
        

            {/* Student and Volunteer */}
            {
                (user.role === 'student' || user.role === 'volunteer') &&
                <div className="form-group">
                <label>First Name
                    <input 
                        type ="text" 
                        name="firstName"
                        onChange={onChange}
                        value={user.firstName}
                    />
                </label>
                <label>Last Name
                    <input 
                        type ="text" 
                        name="lastName"
                        onChange={onChange}
                        value={user.lastName}
                    />
                </label>
                </div>
            }   

            {/* Volunteer, Student and Admin */}
            {
                user.role && 
                <div className="form-group">
                <label>Username
                    <input 
                        type ="text" 
                        name="username"
                        onChange={onChange}
                        value={user.username}
                    />
                </label>
                <label>Password
                    <input 
                        type ="password" 
                        name="password"
                        onChange={onChange}
                        value={user.password}
                    />
                </label>
                </div>
            }

            
            
            {/* Admin only */}
            {
                user.role === 'admin' &&
                <div className="form-group">
                    <label>Admin Code
                        <input 
                            type ="password" 
                            name="adminCode"
                            onChange={onChange}
                            value={user.adminCode}
                        />
                    </label>
                </div>
            }

            <div className='errors'>
              <div>{formErrors.role}</div>
              <div>{user.role === 'admin' ? '' : formErrors.firstName}</div>
              <div>{user.role === 'admin' ? '' : formErrors.lastName}</div>
              <div>{formErrors.username}</div>
              <div>{formErrors.password}</div>
              <div>{user.role === 'student' || user.role === 'volunteer' ? '' : formErrors.adminCode}</div>
            </div>

            <button className="register-user-btn" disabled={disabled}>Register!</button>

            {
              registered &&
              <div>
                <p>Successfully Registered as a {user.role}! Redirecting to login...</p>
              </div>
            }

          </form>
        </div>
    )
}

export default Register
