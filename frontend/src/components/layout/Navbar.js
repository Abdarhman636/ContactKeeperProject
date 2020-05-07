import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'


const Navbar = () => {

     const authContext = useContext(AuthContext)
     const { isAuthenticated, logout, user } = authContext

     const onLogout = () => {
          logout()
     }

     const authLinks = (
          <Fragment>
               <li> Hello {user && (user.name).toUpperCase()} </li>
               <li>
                    <a href='#!' onClick={onLogout}>
                         <i className='fas fa-sign-out-alt' /> <span className='hide-sm'>logout</span>
                    </a>
               </li>
          </Fragment>
     )

     const guestLinks = (
          <Fragment>
               <li><Link to='/register'> Register</Link></li>
               <li><Link to='/login'> Login</Link></li>
          </Fragment>
     )

     return (
          <div className="navbar bg-primary">
               <h1>
                    <i className="fas fa-id-card-alt" />  Contact Keeper
               </h1>
               <ul>
                    {isAuthenticated ? authLinks : guestLinks}
               </ul>
          </div>
     );
}

export default Navbar;