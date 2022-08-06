import { useContext, useState, useEffect } from "react";
import { getUserRecipes, deleteRecipe, saveRecipeWithUrl } from "../../services/recipe.service";
import { UserContext } from "../../context/UserProvider";
import { Recipe } from "./Recipes.models";
import firebase from "firebase/compat";
import Filters from "../Filters";
import RecipeCard from "../RecipeCard";
import styles from "./Recipes.module.scss";
import { signOut } from "../../services/auth.service";

const Recipes = () => {
  const { user, isLoading: isLoadingUser }: { user: firebase.User, isLoading: boolean } = useContext(UserContext)

  const [recipes, setRecipes]:any = useState([]);
  const [filters, setFilters] = useState({cuisine: '', category: ''})
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [isScrapingRecipe, setIsScrapingRecipe] = useState(false)

  useEffect(() => {
    if (user) {
      const getRecipes = async (): Promise<void> => {
        const recipeArray: any = await getUserRecipes(user?.uid);
        setRecipes(recipeArray);
      };
      getRecipes();
    }
  }, [user]);

  useEffect(() => {
    const cuisine = filters.cuisine
    const category = filters.category

    let filtered = recipes;
    if (cuisine) filtered = filtered.filter(( recipe: Recipe ) => recipe.cuisine === cuisine)
    if (category) filtered = filtered.filter(( recipe: Recipe ) => recipe.category === category)
    setFilteredRecipes(filtered)
  }, [recipes, filters])

  if (isLoadingUser || isScrapingRecipe) return <p>Loading ...</p>

  const deleteRecipeAndRefresh = async (docId: string): Promise<void> => {
    deleteRecipe(user.uid, docId);
    const recipeArray = await getUserRecipes(user.uid);
    setRecipes(recipeArray);
  };

  const addRecipeFromURL = async (event: any) => {
    event.preventDefault();
    const url = event.target[0].value;
    if (!url) return
    setIsScrapingRecipe(true)
    event.target[0].value = null
    await saveRecipeWithUrl(user.uid, url)
    const recipeArray: any = await getUserRecipes(user.uid);
    setRecipes(recipeArray);
    setIsScrapingRecipe(false)
  }

  const cuisines: string[] = Array.from(new Set(recipes.map((recipe:Recipe) => recipe.cuisine)))
  const categories: string[] = Array.from(new Set(recipes.map((recipe:Recipe) => recipe.category)))

  return (
    <div className={styles.results}>
      <Filters cuisines={cuisines} categories={categories} setFilters={setFilters} activeFilters={filters}/>
      <div className={styles.resultsTop}>
        <p>Welcome back! {user?.displayName}</p>
        <form onSubmit={addRecipeFromURL}>
          <input type="text" placeholder="url for recipe to save"/>
          {isScrapingRecipe ? <button >Getting recipe...</button>
          : <button type="submit" id='saveBtn'>Save</button>}
        </form>
        <button onClick={signOut}>Logout</button>
      </div>
      <div className={styles.cardsContainer}>
        {filteredRecipes &&
          filteredRecipes.map((recipe: Recipe) => (
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
