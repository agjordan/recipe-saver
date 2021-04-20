import { useContext, useState, useEffect } from "react";
import { getUserRecipes } from "../../services/recipe.service";
import { UserContext } from "../../context/UserProvider";
import RecipeCard from "../RecipeCard/RecipeCard";
import { IRecipe } from "./Recipes.models";
import styles from "./Recipes.module.scss";

const Recipes = () => {
  const userContext = useContext(UserContext);

  const [recipes, setRecipes] = useState([]);
  const [userID] = useState(userContext.user.uid)

  useEffect(() => {
    const getRecipes = async (): Promise<void> => {
    const recipeArray: any = await getUserRecipes(userID);
    setRecipes(recipeArray);
    };
    getRecipes();
  }, [userID]);


  
  return (
    <div className={styles.results}>
      {recipes && recipes.map((recipe: IRecipe) => <RecipeCard key={recipe.id} {...recipe}/>)}
    </div>
  );
};

export default Recipes;
