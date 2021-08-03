import { useHistory,useParams } from 'react-router'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Formik,Form} from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormControl from '../Formik/FormControl'
import './ResetPassword.css'
function ResetPassword() {
    const history = useHistory();
    const ResetToken = useParams();

    const initialValues = {
        password : '',
        confirmpassword : ''
    }
    const validationSchema = Yup.object({
        password : Yup.string()
            .required('Enter your password')
            .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
        confirmpassword : Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })
    const onSubmit = async (values,onSubmitProps) => {
        const {password} = values
        let tostify,msg;
        try{
            await axios.put(`${process.env.REACT_APP_BE_SERVER_URL}/api/auth/reset-password/${ResetToken.resetToken}`,{password})
            .then(res => {
                tostify = toast.success;
                msg = 'Password Updated Successfully'
            })
        }catch(error){
            tostify = toast.error;
            msg = error.response.data
        }
        
        tostify(msg, {
            position: "top-right",
            autoClose: 3000
        });
    }
    return (
        <>
          <ToastContainer />  
          <div className="container-fluid" style={{marginTop:'60px'}}>
                <div className="row content-center  resetImg">
                    <div className="col-auto mb-3" style={{width:'18rem'}}>
                            <h5 className="text-center text-info display-5">Reset Password</h5>
                            <Formik initialValues = {initialValues} validationSchema = {validationSchema} onSubmit= {onSubmit} validateOnMount>
                                {
                                    (formik) => (
                                        <Form>
                                            <FormControl control = 'input' type= 'password' label = 'Password' name='password' />
                                            <FormControl control = 'input' type= 'password' label = 'Confirm Password' name='confirmpassword' />
                                            <button type='submit'  className={`btn btn-block btn-success ${!(formik.isValid) ? 'not-allowed' : ''}`} disabled= {!(formik.isValid)} >Reset</button>
                                        </Form>
                                    )
                                }
                            </Formik>
                            <span className='small text-warning'>
                                Remember Password ?    
                                <Link to='/signin' style={{ textDecoration: 'none',color:'rgb(243, 82, 135)' }}>   Login</Link> 
                            </span>
                       {/*  </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword
