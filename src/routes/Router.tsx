import React from "react";
import Login from "../components/Login";
import Home from "../components/Home"
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
