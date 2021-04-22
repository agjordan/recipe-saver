import React from 'react';
import {UserProvider} from './context/UserProvider';
import Router from './routes';
// import Router from './routes/Router';


const App = () => {

  return (
    <UserProvider >
      <Router />
    </UserProvider>
  )
}

export default App
