import React, { useContext } from 'react'
import {UserContext} from "../../context/UserProvider"
import {signOut} from "../../services/auth.service"

  
const Home = () => {
    const userContext = useContext(UserContext);  

    return (
        <>
        {userContext.user &&
        <>
          <p>Welcome back! {userContext.user.displayName}</p>
          <img src={userContext.user.photoURL} alt=""/>
          <div><button onClick={signOut}>Logout</button></div>
        </>}
        </>
    )
}

export default Home
