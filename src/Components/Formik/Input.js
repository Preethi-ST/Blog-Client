import React from 'react'
import {Field,ErrorMessage} from 'formik'
import TextError from './TextError'
import {Link} from 'react-router-dom'

function Input(props) {
    const {label,name,...rest} = props
    return (
        <div className="mb-3 form-group">
            <label htmlFor = {name} className="control-label logo-text">{label}</label>
            {props.additional && <Link to='/forgotpassword' style={{color:"red",float:'right',paddingTop: '5px'}} className='small'>  ForgotPassword?</Link>}
            <Field className ="form-control form-control-sm" id={name} name={name} {...rest} />
            <ErrorMessage name={name} component = {TextError} />
        </div>
        
    )
}

export default Input