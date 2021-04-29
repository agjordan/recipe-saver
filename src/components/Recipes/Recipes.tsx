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
  const [filters, setFilters] = useState({cuisine: '', category: ''})
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    const getRecipes = async (): Promise<void> => {
      const recipeArray: any = await getUserRecipes(userID);
      setRecipes(recipeArray);
    };
    getRecipes();
  }, [userID]);

  useEffect(() => {
    const cuisine = filters.cuisine
    const category = filters.category

    let filtered = recipes;
    if (cuisine) filtered = filtered.filter((recipe:IRecipe) => recipe.cuisine === cuisine)
    if (category) filtered = filtered.filter((recipe:IRecipe) => recipe.category === category)
    setFilteredRecipes(filtered)
  }, [recipes, filters])

  const deleteRecipeAndRefresh = async (docId: string): Promise<void> => {
    deleteRecipe(userID, docId);
    const recipeArray: any = await getUserRecipes(userID);
    setRecipes(recipeArray);
  };

  const addRecipeFromURL = async (event: any) => {
    event.preventDefault();
    const url = event.target[0].value;
    if (!url) return
    setFetching(true)
    event.target[0].value = null
    await saveRecipeWithUrl(userID, url)
    const recipeArray: any = await getUserRecipes(userID);
    setRecipes(recipeArray);
    setFetching(false)
  }

  const cuisines: string[] = Array.from(new Set(recipes.map((recipe:IRecipe) => recipe.cuisine)))
  const categories: string[] = Array.from(new Set(recipes.map((recipe:IRecipe) => recipe.category)))

  return (
    <div className={styles.results}>
      <Filters cuisines={cuisines} categories={categories} setFilters={setFilters} activeFilters={filters}/>
      <div className={styles.resultsTop}>
        <p>Welcome back! {userContext.user.displayName}</p>
        <form onSubmit={addRecipeFromURL}>
          <input type="text" placeholder="url for recipe to save"/>
          {fetching ? <div className={styles.ldsRing}><div></div><div></div><div></div><div></div></div>
          : <button type="submit" id='saveBtn'>Save</button>}
        </form>
        <button onClick={signOut}>Logout</button>
      </div>
      <div className={styles.cardsContainer}>
        {filteredRecipes &&
          filteredRecipes.map((recipe: IRecipe) => (
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
