import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../Recipes/Recipes.models";
import styles from "./RecipeCard.module.scss";

const RecipeCard: FC<Recipe> = ({category, cuisine, image, name, id, delRecipe}) => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${id}`);
  };
  
  const removeRecipe = (event:any) => {
    event.stopPropagation();
    delRecipe(id)
  }

  return (
    <div className={styles.card} onClick={handleClick}>
      <span className={styles.delButton} onClick={removeRecipe}>X</span>
      <div className={styles.title}>
        {name}
      </div>
      <img src={image} alt="" />
      <div>
        <span>{category} </span>
        <span> | </span>
        <span>{cuisine}</span>
      </div>
    </div>
  );
};

export default RecipeCard;
