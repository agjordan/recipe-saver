import React, {  } from 'react';
import {UserProvider} from './context/UserProvider';
import Router from './routes/Router';

const App = () => {

  return (
    <UserProvider value={null}>
      <Router /> 
    </UserProvider>
  )
}

export default App
