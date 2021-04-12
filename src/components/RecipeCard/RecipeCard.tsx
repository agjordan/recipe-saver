import React from 'react'
import { IRecipe } from '../Recipes/Recipes.models'
import styles from './RecipeCard.module.scss'

const RecipeCard = ({json, name, url}:IRecipe) => {
    const recipeInfo = JSON.parse(json)

    const getDisplayName = (name: string) => {
        return name.length > 25 ? name.slice(0,22) + '...' : name
    }


    return (
        <div className={styles.card}>
            <h1>{getDisplayName(name)}</h1>
            <img src={recipeInfo.image[0]} alt=""/>
            <span>{recipeInfo.recipeCategory} </span> 
            <span> | </span>
            <span>{recipeInfo.recipeCuisine}</span>
        </div>
    )
}

export default RecipeCard
