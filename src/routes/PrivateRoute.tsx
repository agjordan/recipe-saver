import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from  '../context/UserProvider'

const PrivateRoute = ({ children, ...rest }:any) => {
    const auth = useContext(UserContext)

    console.log('Private route: ', auth)
    return (
        <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    )
}

export default PrivateRoute