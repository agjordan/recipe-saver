import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { signInWithGoogle, signInWithEmail } from "../../services/auth.service";
import { Link, Redirect } from "react-router-dom";
import styles from "./Login.module.scss";

const Login = () => {
  const userContext = useContext(UserContext);

  const handleSubmit = (e:any):void => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    signInWithEmail(email, password)
  }

  return (
    <div>
      {userContext.user && (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      )}
      {!userContext.user && (
        <div className={styles.loginContainer}>
          <h1>Recipe Saver</h1>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <input className={styles.formElement} type="email" placeholder="email" autoComplete="email"/>
            <input className={styles.formElement} type="password" placeholder="password" autoComplete="current-password"/>
            <button className={styles.formElement} type="submit">Login</button>
            <p><Link to='/register'>register</Link></p>
          </form>
          
          <div className={styles.formElement} onClick={signInWithGoogle}>
            Google Login
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
