import { useContext, useState, useEffect, Dispatch } from "react";
import { getUserRecipes, deleteRecipe } from "../../services/recipe.service";
import { UserContext } from "../../context/UserProvider";
import RecipeCard from "../RecipeCard/RecipeCard";
import { IRecipe } from "./Recipes.models";
import { signOut } from "../../services/auth.service";
import styles from "./Recipes.module.scss";

const Recipes = () => {
  const userContext = useContext(UserContext);

  const [recipes, setRecipes] = useState([]);
  const [userID]: [any, Dispatch<any>] = useState(userContext.user.uid);

  useEffect(() => {
    const getRecipes = async (): Promise<void> => {
      const recipeArray: any = await getUserRecipes(userID);
      setRecipes(recipeArray);
    };
    getRecipes();
  }, [userID]);

  const deleteRecipeAndRefresh = async (docId: string) => {
    deleteRecipe(userID, docId);
    const recipeArray: any = await getUserRecipes(userID);
    setRecipes(recipeArray);
  };

  return (
    <div className={styles.results}>
      <div className={styles.resultsTop}>
        <p>Welcome back! {userContext.user.displayName}</p>
        <button onClick={signOut}>Logout</button>
      </div>
      <div className={styles.cardsContainer}>
        {recipes &&
          recipes.map((recipe: IRecipe) => (
            <RecipeCard
              key={recipe.id}
              {...recipe}
              delRecipe={deleteRecipeAndRefresh}
            />
          ))}
      </div>
    </div>
  );
};

export default Recipes;
