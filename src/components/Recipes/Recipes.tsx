import { useContext } from 'react'
import { getUserRecipes } from '../../services/recipe.service'
import { UserContext } from "../../context/UserProvider"

const Recipes = () => {
    const userContext = useContext(UserContext)

    const logRecipes = () => {
        console.log(getUserRecipes(userContext.user.uid))
    }

    return (
        <div>
            <button onClick={logRecipes}>GetRecipes</button>
        </div>
    )
}

export default Recipes
