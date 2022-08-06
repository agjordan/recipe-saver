import React, { useContext } from 'react'
import { UserContext } from "../../context/UserProvider"
import { signOut } from "../../services/auth.service"

  
const Home = () => {
    const { user, isLoading } = useContext(UserContext);  

    if (isLoading) return <p>Loading ...</p>

    return (
        <>
        {user &&
        <>
          <p>Welcome back! {user.displayName}</p>
          <img src={user.photoURL} alt=""/>
          <div>
            <button onClick={signOut}>Logout</button>
          </div>
        </>}
        </>
    )
}

export default Home
