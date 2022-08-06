import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { firesbaseAuth } from '../services/firebase.service';

interface IPrivateRoute {
  children: ReactNode;
}

const PrivateRoute: FC<IPrivateRoute> = ({ children }) => {

  const [ isLoading, setIsLoading ] = useState(false);
  const navigate = useNavigate();
  
  const checkAuth = useCallback(() => {
    firesbaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoading(false)
      } else {
        navigate('/login')
      }
    });
  }, [navigate])

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if (isLoading) return <p>Loading ...</p>

  return <>{children}</>
}

export default PrivateRoute