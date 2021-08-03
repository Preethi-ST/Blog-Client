import axios from 'axios'
import {Link} from 'react-router-dom'
import {Formik,Form} from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormControl from '../Formik/FormControl'
import './ForgotPassword.css'

function ForgotPassword() {

    const initialValues = {
        email : '',
    }
    const validationSchema = Yup.object({
        email : Yup.string().email('Enter valid email').required('Email is required')
    })
    const onSubmit = async (values,onSubmitProps) => {
        const {email} = values
        let toastify,msg;
        try{
            await axios.post(`${process.env.REACT_APP_BE_SERVER_URL}/api/auth/forgot-password`,{
                email
            }).then(res => {
                toastify = toast.success;
                msg = res.data.message
            })

        }catch(error){
            toastify = toast.error;
            msg = error.response.data.error
        }
        toastify(msg,{
            position: "top-right",
            autoClose: 5000
        })
        onSubmitProps.resetForm()
    }
    return (
        <>
          <ToastContainer />  
          <div className="container-fluid" style={{marginTop:'60px'}}>
                <div className="row content-center  forgotImg">
                    <div className="col-auto mb-3" style={{width:'18rem'}}>
                            <h5 className="text-center text-info display-5">Forgot Password</h5>
                            <Formik initialValues = {initialValues} validationSchema = {validationSchema} onSubmit= {onSubmit} validateOnMount>
                                {
                                    (formik) => (
                                        <Form>
                                            <FormControl control = 'input' type= 'email' label = 'Email' name='email' />
                                            <button type='submit'  className={`btn btn-block btn-success ${!(formik.isValid) ? 'not-allowed' : ''}`} disabled= {!(formik.isValid)} >Send Mail</button>
                                        </Form>
                                    )
                                }
                            </Formik>
                            <span className='small text-white'>
                                Remember Password ?    
                                <Link to='/signin' style={{ textDecoration: 'none',color:'rgb(243, 82, 135)' }}>   Login</Link> 
                            </span>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
