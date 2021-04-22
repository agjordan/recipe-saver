import React from 'react'
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { registerNewUser } from "../../services/auth.service";
import { Redirect } from "react-router-dom";
import styles from "./Register.module.scss";

function Register() {
    const userContext = useContext(UserContext)
    const handleSubmit = (e: any) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        registerNewUser(email, password)
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
            <div className={styles.registerContainer}>
              <h1>Recipe Saver</h1>
              <form onSubmit={handleSubmit} className={styles.registerForm}>
                <input className={styles.formElement} type="email" placeholder="email" autoComplete="email"/>
                <input className={styles.formElement} type="password" placeholder="password" autoComplete="new-password"/>
                <button className={styles.formElement} type="submit">Register</button>
              </form>
            </div>
          )}
        </div>
      );
}

export default Register
