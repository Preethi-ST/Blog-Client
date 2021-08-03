import axios from 'axios'
import { useHistory } from 'react-router'
import {Link} from 'react-router-dom'
import {Formik,Form} from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css'
import FormControl from '../Formik/FormControl'

function Register() {
    const history = useHistory();
    const initialValues = {
        username : '',
        email : '',
        password : '',
        confirmpassword : ''
    }
    const validationSchema = Yup.object({
        username : Yup.string().required('Name is mandatory').min(5, 'Name must atleast contain 5 characters'),
        email : Yup.string().email('Enter valid email').required('Email is required'),
        password : Yup.string()
            .required('Please Enter your password')
            .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
        confirmpassword : Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })
    const onSubmit = async (values,onSubmitProps) => {
        console.log(values)
        const {username,email,password} = values
        let tostify,msg;
        try{
            const result = await axios.post(`${process.env.REACT_APP_BE_SERVER_URL}/api/auth/register/`,{
                username,
                email,
                password
            })
            tostify = toast;
            msg = 'Registration Success'
            setTimeout(() => {
                history.push('/signin')
            }, 2000);
        }catch(error){
            console.log(error.response)
            tostify = toast.error;
            msg = error.response.data.error || error
        }
        tostify(msg,{
            position: "top-right",
            autoClose: 5000
        })
        onSubmitProps.resetForm();
    }
    return (
        <>
          <ToastContainer />  
          <div className="container-fluid ">
                <div className="row content-center regImg">
                    <div className="col-auto mb-3" style={{width:'18rem'}}>
                        {/* <div className="card shadow-lg" style={{backgroundImage:"linear-gradient(to bottom right,  rgb(249, 229, 252) , rgb(169, 169, 247))"}}> */}
                            <h5 className="text-center text-info display-4">Register</h5>
                            <Formik initialValues = {initialValues} validationSchema = {validationSchema} onSubmit= {onSubmit} validateOnMount>
                                {
                                    (formik) => (
                                        <Form>
                                            <FormControl control = 'input' type= 'text' label = 'UserName' name='username' />
                                            <FormControl control = 'input' type= 'email' label = 'Email' name='email' />
                                            <FormControl control = 'input' type= 'password' label = 'Password' name='password' />
                                            <FormControl control = 'input' type= 'password' label = 'Confirm Password' name='confirmpassword' />
                                            <button type='submit'  className={`btn btn-block btn-success ${!(formik.isValid) ? 'not-allowed' : ''}`} disabled= {!(formik.isValid)} >Register</button>
                                        </Form>
                                    )
                                }
                            </Formik>
                            <span className='small'>
                                Already have an account?    
                                <Link to='/signin' style={{ textDecoration: 'none' }}>    Login</Link> 
                            </span>
                       {/*  </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
