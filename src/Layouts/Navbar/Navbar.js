import React, { useContext, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import { IconContext } from 'react-icons';
import {BlogContext} from '../../Context/Context'
function Navbar() {
  const {user,dispatch} = useContext(BlogContext)
  const history = useHistory()
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  }
  const handleLogout = async () => {
    try{
      await axios.get(`${process.env.REACT_APP_BE_SERVER_URL}/api/auth/logout`)
      dispatch({type:'LOGOUT'})
      history.push('/homepage')
    }catch(error){
      alert('Something went wrong')
    }
  }
  

  return (
    <>
      <IconContext.Provider value={{ color: '#ADEFD1FF' }}>
        <div className='navbar text-white'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <span className='logo-text' style={{fontSize:'2rem'}}>Blogzoid</span>
          {
            !user
            ?
            <>
            <Link to='/signup' className='menu-bars  ml-auto'>
              <span>Register</span>
            </Link>
            <Link to='/signin' className='menu-bars'>
              <span>Login</span>
            </Link>
            </>
            :
            <>
            {console.log(user)}
            <span className=' ml-auto'><pre className='logo-text'>Welcome!  <strong style={{fontSize:'20px'}}>{user.username || user[0].username}</strong></pre></span>
            </>
          }
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
               <span className='logo-text mt-4 mr-3' style={{fontSize:'2rem'}}>Blogzoid</span>   
              </Link>
            </li>
            <li className = 'nav-text'>
              <Link to='/homepage'>
              <AiIcons.AiFillHome />
              <span>Home</span>
              </Link>
            </li>
            <li className = 'nav-text'>
              <Link to='/write'>
              <FaIcons.FaPenNib />
              <span>Write</span>
              </Link>
            </li>
            {
              user ? (
                <li className = 'nav-text' style={{ color: '#ADEFD1FF' }}>
                  <a>
                  <AiIcons.AiOutlineLogout />
                  <button onClick={handleLogout}>Logout</button>
                  </a>
                </li>
              ) : ''
            }

            <li className = 'nav-text'>
              <Link to='/contact'>
              <RiIcons.RiContactsBookFill />
              <span>Contact</span>
              </Link>
            </li>
            
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
