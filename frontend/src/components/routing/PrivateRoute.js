import React, {useContext} from 'react'
import { Route, Redirect, Router } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

export const PrivateRoute = ({ component: Component, ...rest}) => {

     const authContext = useContext(AuthContext)
     const { isAuthenticated, loading } = authContext

     return (
          <Route {...rest} render={props => !isAuthenticated && !loading ? (
               <Redirect to='/login' />
          ) : (
               <Component {...props}/>
          )} />
     )
}

export default PrivateRoute