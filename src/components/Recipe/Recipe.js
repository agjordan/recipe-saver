"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var UserProvider_1 = require("../../context/UserProvider");
var recipe_service_1 = require("../../services/recipe.service");
var Recipe_module_scss_1 = require("./Recipe.module.scss");
var html_react_parser_1 = require("html-react-parser");
function Recipe() {
    var _this = this;
    var userContext = react_1.useContext(UserProvider_1.UserContext);
    var params = react_router_dom_1.useParams();
    var userId = react_1.useState(userContext.user.uid)[0];
    var _a = react_1.useState(null), recipe = _a[0], setRecipe = _a[1];
    react_1.useEffect(function () {
        var getRecipe = function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, recipe_service_1.getRecipeByID(userId, params.recipeId)];
                    case 1:
                        result = _a.sent();
                        setRecipe(result);
                        return [2 /*return*/];
                }
            });
        }); };
        getRecipe();
    }, [userId, params.recipeId]);
    if (recipe)
        console.log(recipe.instructions);
    return (react_1["default"].createElement("div", { className: Recipe_module_scss_1["default"].page }, recipe && (react_1["default"].createElement("div", { className: Recipe_module_scss_1["default"].recipe },
        react_1["default"].createElement("div", { className: Recipe_module_scss_1["default"].titleImageContainer },
            react_1["default"].createElement("img", { src: recipe.images[0], alt: recipe.name }),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("h1", { className: Recipe_module_scss_1["default"].name }, html_react_parser_1["default"](recipe.name)),
                react_1["default"].createElement("h3", { className: Recipe_module_scss_1["default"].localeAndTime },
                    react_1["default"].createElement("span", null,
                        " ",
                        recipe.category,
                        " "),
                    react_1["default"].createElement("span", null, " | "),
                    react_1["default"].createElement("span", null,
                        " ",
                        recipe.cuisine,
                        " "),
                    react_1["default"].createElement("span", null, " | "),
                    react_1["default"].createElement("span", null,
                        " ",
                        recipe.yield,
                        " ")),
                react_1["default"].createElement("h3", null, "Prep: " + recipe.prepTime.replace(/PT(\d+)H(\d+)M/, "$1h $2m") + " \n                  | Cook: " + recipe.cookTime.replace(/PT(\d+)H(\d+)M/, "$1h $2m")))),
        react_1["default"].createElement("div", { className: Recipe_module_scss_1["default"].instructionIngredientsContainer },
            react_1["default"].createElement("ul", null, recipe.ingredients.map(function (ingredient) { return (react_1["default"].createElement("li", null, html_react_parser_1["default"](ingredient))); })),
            react_1["default"].createElement("ol", null, recipe.instructions.map(function (instruction) { return (react_1["default"].createElement("li", null, html_react_parser_1["default"](instruction.text))); })))))));
}
exports["default"] = Recipe;
