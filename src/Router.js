import React,{useContext} from 'react'
import Navbar from './Layouts/Navbar/Navbar'
import { BrowserRouter , Switch, Route, Redirect } from 'react-router-dom';
//CUSTOM IMPORTS
import { BlogContext } from './Context/Context';
import Home from './Components/Screens/Home'
import Write from './Components/Screens/Write'
import Contact from './Components/Screens/Contact';
import SinglePost from './Components/Screens/SinglePost';
import Register from './Components/PublicScreens/Register';
import Login from './Components/PublicScreens/Login';
import ForgotPassword from './Components/PublicScreens/ForgotPassword';
import ResetPassword from './Components/PublicScreens/ResetPassword';
import Footer from './Layouts/Footer/Footer';

function Router() {
    const {user} = useContext(BlogContext)
    return (
        <BrowserRouter basename='/Blogzoid'>
            <Navbar />
            <div  className="container-fluid align-app">
                <Switch>
                    <Route exact path="/">
                        <Redirect to='/homepage' />
                    </Route>
                    <Route exact path='/homepage' exact component={Home} />
                    <Route exact path='/signup' component = {user ? Home : Register} />
                    <Route exact path='/signin' component = {user ? Home : Login} />
                    <Route exact path='/forgotpassword' component = {ForgotPassword} />
                    <Route exact path='/resetpassword/:resetToken' component = {ResetPassword} />
                    <Route exact path='/contact' component={Contact} />
                    <Route exact path='/write'>
                        { user ? <Write /> : <Login />}
                    </Route>
                    <Route exact path="/singlepost/:postId">
                        <SinglePost />
                    </Route>
                </Switch>
                <Footer />
            </div>
      </BrowserRouter>
    )
}

export default Router
