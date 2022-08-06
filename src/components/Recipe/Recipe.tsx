import React, { useState, useEffect, useContext } from "react";
import firebase from "../../services/firebase.service"
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import { getRecipeByID } from "../../services/recipe.service";
import styles from "./Recipe.module.scss";
import parse from "html-react-parser";
import Notes from "../Notes";

function Recipe() {
  const { user, isLoading } = useContext(UserContext);
  const params: any = useParams();
  const [recipe, setRecipe] = useState<firebase.firestore.DocumentData | undefined>();

  useEffect(() => {
    const getRecipe = async () => {
      setRecipe(await getRecipeByID(user?.uid, params.recipeId));
    };

    getRecipe();
  }, [user, params.recipeId]);

  if (isLoading) return <p>Loading ...</p>

  return (
    <div className={styles.page}>
      {recipe && (
        <>
          <Notes key={params.recipeId} notes={recipe.notes} userId={user.uid} docId={params.recipeId}/>
          <div className={styles.recipe}>
            <div className={styles.titleImageContainer}>
              <img src={recipe.image} alt={recipe.name} />
              <div className={styles.recipeHeader}>
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
                  | Cook: ${recipe.cookTime.replace(/PT(\d+)H(\d+)M/, "$1h $2m")}`}
                </h3>
              </div>
            </div>
            <div className={styles.instructionIngredientsContainer}>
              <ul>
                {recipe.ingredients.map((ingredient: any) => (
                  <li key={ingredient}>{parse(ingredient)}</li>
                ))}
              </ul>
              <ol>
                {recipe.instructions.map((instruction: any) => (
                  <li key={instruction.text}>{parse(instruction.text)}</li>
                ))}
              </ol>
            </div>
            <a href={recipe.url} target="_blank" rel="noreferrer">
              <p>See original recipe</p>
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default Recipe;
