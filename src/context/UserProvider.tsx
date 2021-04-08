import React, { useEffect, useState } from "react";
import auth from "../services/auth.service";

export const UserContext = React.createContext<any>(null);

export const UserProvider = ({ children }:any) => {
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    return () => {
      unsubscribe()
    }
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};