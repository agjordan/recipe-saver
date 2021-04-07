import { useContext } from "react";
import {UserContext} from "../../context/UserProvider";
import { signIn } from "../../services/auth.service";

const Login = () => {
  
  const userContext = useContext(UserContext);

  return (
    <div>
      {!userContext.user && <button onClick={signIn}>Login</button>}
    </div>
  );
};

export default Login;
