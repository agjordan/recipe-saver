import firebase from "firebase/compat";
import React, { useEffect, useState } from "react";
import auth from "../services/auth.service";

export const UserContext = React.createContext<any>(null);

export const UserProvider = ({ children }:any) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    let unsubscribe: firebase.Unsubscribe;
    setIsLoading(true);
    try {
      unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
    
    return () => {
      unsubscribe()
    }
  }, []);

  return (
    <UserContext.Provider value={{ user: user, isLoading: isLoading }}>{children}</UserContext.Provider>
  );
};