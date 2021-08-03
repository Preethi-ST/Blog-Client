import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react'
import Reducer from './Reducer'

const INITIAL_STATE = {
    user : null,
    isFetching : false,
    error : false
}
export const BlogContext = createContext(INITIAL_STATE);

export const BlogContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(Reducer,INITIAL_STATE)
    const checkLoggedIn = async () => {
        const loggedIn = await axios.get(`${process.env.REACT_APP_BE_SERVER_URL}/api/auth/isLoggedIn`,{
            withCredentials : true
        })
        dispatch({type:'LOGIN_SUCCESS',payload : loggedIn.data.user})
    }
    useEffect(() => {
        checkLoggedIn();
        return () => {
            <></>
        }
    },[])

    return(
        <BlogContext.Provider value = {{
            user : state.user,
            isFetching : state.isFetching,
            error : state.error,
            dispatch,
            checkLoggedIn
        }}>
            {children}
        </BlogContext.Provider>
    )
}