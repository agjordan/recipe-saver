import React from "react";
import Login from "../components/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Recipes from "../components/Recipes";
import Recipe from "../components/Recipe";
import Register from "../components/Register";

const Router = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <PrivateRoute>
          <Route exact path="/">
            <Recipes />
          </Route>
          <Route exact path="/recipes">
            <Recipes />
          </Route>
          <Route exact path="/recipe/:recipeId">
            <Recipe />
          </Route>
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
};


export default Router;