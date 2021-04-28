import { useContext, useState, useEffect } from "react";
import { getUserRecipes, deleteRecipe, saveRecipeWithUrl } from "../../services/recipe.service";
import { UserContext } from "../../context/UserProvider";
import RecipeCard from "../RecipeCard/RecipeCard";
import { IRecipe } from "./Recipes.models";
import { signOut } from "../../services/auth.service";
import styles from "./Recipes.module.scss";
import Filters from "../Filters";

const Recipes = () => {
  const userContext = useContext(UserContext);

  const [recipes, setRecipes]:any = useState([]);
  const [userID] = useState(userContext.user.uid);

  useEffect(() => {
    const getRecipes = async (): Promise<void> => {
      const recipeArray: any = await getUserRecipes(userID);
      setRecipes(recipeArray);
    };
    getRecipes();
  }, [userID]);

  const deleteRecipeAndRefresh = async (docId: string): Promise<void> => {
    deleteRecipe(userID, docId);
    const recipeArray: any = await getUserRecipes(userID);
    setRecipes(recipeArray);
  };

  const addRecipeFromURL = async (event: any) => {
    event.preventDefault();
    const url = event.target[0].value;
    event.target[0].value = null
    await saveRecipeWithUrl(userID, url)
    const recipeArray: any = await getUserRecipes(userID);
    setRecipes(recipeArray);
  }

  const cuisines: string[] = Array.from(new Set(recipes.map((recipe:IRecipe) => recipe.cuisine)))
  const categories: string[] = Array.from(new Set(recipes.map((recipe:IRecipe) => recipe.category)))
  return (
    <div className={styles.results}>
      {/* <Filters cuisines={cuisines} categories={categories} /> */}
      <div className={styles.resultsTop}>
        <p>Welcome back! {userContext.user.displayName}</p>
        <form onSubmit={addRecipeFromURL}>
          <input type="text" placeholder="url for recipe to save"/>
          <button type="submit">Save</button>
        </form>
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
