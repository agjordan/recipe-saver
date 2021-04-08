import { useContext } from "react";
import {UserContext} from "../../context/UserProvider";
import { signIn } from "../../services/auth.service";
import { Redirect } from "react-router-dom"

const Login = () => {
  
  const userContext = useContext(UserContext);

  return (
    <div>
      {userContext.user && (<Redirect to={{
                pathname: "/"
              }}></Redirect>)}
      {!userContext.user && 
      <button onClick={signIn}>Login</button>}
    </div>
  );
};

export default Login;
