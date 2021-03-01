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

    // form validation; disabled button
    useEffect(() => {
      let formSchema = user.role === 'admin'
        ? formSchemaAdmin
        : formSchemaSV
    
      formSchema.isValid(user).then(valid => setDisabled(!valid))
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
        console.log('registered')
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

        axios.post(`api/auth/register-${user.role}`)
          .then(res => {
            console.log(res)

          })
          .catch(err => {
            console.log(err)
          })

    }

    return (
        <div>
          <form onSubmit={onSubmit}>
            <select name="role" onChange={onChange} value={user.role}>
                <option value="">---What is your Role?---</option>
                <option value="student">Student</option>
                <option value="volunteer">Volunteer</option>
                <option value="admin">Admin</option>
            </select>
        

            {/* Student and Volunteer */}
            {
                (user.role === '' || user.role === 'student' || user.role === 'volunteer') &&
                <fieldset>
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
                </fieldset>
            }   

            {/* Volunteer, Student and Admin */}
            {
                user.role && 
                <fieldset>
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
                </fieldset>
            }

            
            
            {/* Admin only */}
            {
                user.role === 'admin' &&
                <label>Admin Code
                    <input 
                        type ="text" 
                        name="adminCode"
                        onChange={onChange}
                        value={user.adminCode}
                    />
                </label>
            }

            <div className='errors'>
              <div>{formErrors.role}</div>
              <div>{user.role === 'admin' ? '' : formErrors.firstName}</div>
              <div>{user.role === 'admin' ? '' : formErrors.lastName}</div>
              <div>{formErrors.username}</div>
              <div>{formErrors.password}</div>
              <div>{user.role === 'student' || user.role === 'volunteer' ? '' : formErrors.adminCode}</div>
            </div>

            <button disabled={disabled}>Register!</button>

          </form>
        </div>
    )
}

export default Register
