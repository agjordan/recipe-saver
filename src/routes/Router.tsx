import React, { useState, useEffect, useContext } from "react";
import Login from "../components/Login";
import Home from "../components/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { UserContext } from "../context/UserProvider"
import Recipes from "../components/Recipes";

const Router = () => {
  const [loaded, setLoaded] = useState(false);
  let userContext = useContext(UserContext)

  useEffect(() => {
    if (userContext.user) setLoaded(true)
  }, [loaded, userContext])

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        {loaded && <PrivateRoute>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/recipes">
            <Recipes />
          </Route>
        </PrivateRoute>}
      </Switch>
    </BrowserRouter>
  );
};


export default Router;