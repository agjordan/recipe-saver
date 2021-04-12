import { useContext, useState } from 'react'
import { getUserRecipes } from '../../services/recipe.service'
import { UserContext } from "../../context/UserProvider"
import RecipeCard from '../RecipeCard/RecipeCard'
import { IRecipe } from './Recipes.models'
import styles from './Recipes.module.scss'



const Recipes = () => {
    const userContext = useContext(UserContext)

    const [recipes, setRecipes] = useState([])

    const getRecipes = async ():Promise<void> => {
        const recipeArray:any = await getUserRecipes(userContext.user.uid)
        setRecipes(recipeArray)
    }

    getRecipes()
    

    return (
        <div className={styles.results}>
            {recipes && recipes.map((recipe: IRecipe) => <RecipeCard {...recipe}/> )}
            
        </div>
    )
}

export default Recipes
