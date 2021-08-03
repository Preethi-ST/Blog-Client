import {useContext,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Formik,Form} from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BlogContext} from '../../Context/Context'
import FormControl from '../Formik/FormControl'
import './Login.css'
function Login() {
    const { user, dispatch, isFetching,checkLoggedIn } = useContext(BlogContext);
    
    const initialValues = {
        email : '',
        password : ''
    }
    const validationSchema = Yup.object({
        email : Yup.string().email('Enter valid email').required('Email is required'),
        password : Yup.string().required('Please Enter your password')
    })
    const onSubmit = async (values,onSubmitProps) => {
        dispatch({type:"LOGIN_START"})
        const {email,password} = values
        let toastify,msg;
        try{
            const result = await axios.post(`${process.env.REACT_APP_BE_SERVER_URL}/api/auth/Login`,{
                email,
                password
            })
            dispatch({type:'LOGIN_SUCCESS',payload : result.data.userdetails})
            console.log(result.data.userdetails)
            msg = result.data.message
            toastify = toast.success;
        }catch(error){
            dispatch({ type: "LOGIN_FAILURE" });
            console.log(error);
            msg = error.response.data.error || error;
            toastify = toast.error;
        }
        onSubmitProps.resetForm();
        toastify(msg,{
            position: "top-right",
            autoClose: 5000
        })
    }
    useEffect(() => {
        checkLoggedIn()
        return () => {
            <></>
        }
    }, [])  
    return (
        <>
          <ToastContainer />  
          <div className="container-fluid ">
                <div className="row content-center loginImg">
                    <div className="col-auto mb-3" style={{width:'18rem'}}>
                            <h5 className="text-center text-info display-4">Login</h5>
                            <Formik initialValues = {initialValues} validationSchema = {validationSchema} onSubmit= {onSubmit} validateOnMount>
                                {
                                    (formik) => (
                                        <Form>
                                            <FormControl control = 'input' type= 'email' label = 'Email' name='email' />
                                            <FormControl control = 'input' type= 'password' label = 'Password' name='password' additional = 'forgotpassword' />
                                            <button type='submit'  className={`btn btn-block btn-success ${!(formik.isValid) ? 'not-allowed' : ''}`} disabled= {!(formik.isValid)} >Login</button>
                                        </Form>
                                    )
                                }
                            </Formik>
                            <span className='small'>
                                New User ?    
                                <Link to='/signup' style={{ textDecoration: 'none' }}>   Register</Link> 
                            </span>
                       {/*  </div> */}
                    </div>
                </div>
            </div>
            {
                isFetching && <p className='text-info'>Verifying User ...</p>
            }
        </>
    )
}

export default Login
