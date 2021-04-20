"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Login_1 = require("../components/Login");
var Home_1 = require("../components/Home");
var react_router_dom_1 = require("react-router-dom");
var PrivateRoute_1 = require("./PrivateRoute");
var UserProvider_1 = require("../context/UserProvider");
var Recipes_1 = require("../components/Recipes");
var Recipe_1 = require("../components/Recipe");
var Router = function () {
    var _a = react_1.useState(false), loaded = _a[0], setLoaded = _a[1];
    var userContext = react_1.useContext(UserProvider_1.UserContext);
    react_1.useEffect(function () {
        if (userContext.user)
            setLoaded(true);
    }, [loaded, userContext]);
    return (react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
        react_1["default"].createElement(react_router_dom_1.Switch, null,
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/login" },
                react_1["default"].createElement(Login_1["default"], null)),
            loaded && react_1["default"].createElement(PrivateRoute_1["default"], null,
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/" },
                    react_1["default"].createElement(Home_1["default"], null)),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/recipes" },
                    react_1["default"].createElement(Recipes_1["default"], null)),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/recipe/:recipeId" },
                    react_1["default"].createElement(Recipe_1["default"], null))))));
};
exports["default"] = Router;
