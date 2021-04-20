import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import { getRecipeByID } from "../../services/recipe.service";
import styles from "./Recipe.module.scss";
import parse from "html-react-parser";

function Recipe() {
  const userContext = useContext(UserContext);
  const params: any = useParams();
  const [userId] = useState(userContext.user.uid);
  const [recipe, setRecipe]: any = useState(null);

  useEffect(() => {
    const getRecipe = async () => {
      const result: any = await getRecipeByID(userId, params.recipeId);
      setRecipe(result);
    };

    getRecipe();
  }, [userId, params.recipeId]);

  if (recipe) console.log(recipe.instructions);

  return (
    <div className={styles.page}>
      {recipe && (
        <div className={styles.recipe}>
          <div className={styles.titleImageContainer}>
            <img src={recipe.images[0]} alt={recipe.name} />
            <div>
              <h1 className={styles.name}>{parse(recipe.name)}</h1>
              <h3 className={styles.localeAndTime}>
                <span> {recipe.category} </span>
                <span> | </span>
                <span> {recipe.cuisine} </span>
                <span> | </span>
                <span> {recipe.yield} </span>
              </h3>
              <h3>
                {`Prep: ${recipe.prepTime.replace(/PT(\d+)H(\d+)M/, "$1h $2m")} 
                  | Cook: ${recipe.cookTime.replace(/PT(\d+)H(\d+)M/, "$1h $2m")
              }`}</h3>
            </div>
          </div>
          <div className={styles.instructionIngredientsContainer}>
            <ul>
              {recipe.ingredients.map((ingredient: any) => (
                <li>{parse(ingredient)}</li>
              ))}
            </ul>
            <ol>
              {recipe.instructions.map((instruction: any) => (
                <li>{parse(instruction.text)}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recipe;
