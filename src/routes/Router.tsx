import React, { FC } from "react";
import Login from "../components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Recipes from "../components/Recipes";
import Recipe from "../components/Recipe";
import Register from "../components/Register";
import PrivateRoute from "./PrivateRoute";

const Router: FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><Recipes /></PrivateRoute>} />
        <Route path="/recipe/:recipeId" element={<PrivateRoute><Recipe /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
};


export default Router;