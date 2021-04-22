import React from "react";
import { useHistory } from "react-router-dom";
import { IRecipe } from "../Recipes/Recipes.models";
import styles from "./RecipeCard.module.scss";

const RecipeCard = (props: any) => {
  const { category, cuisine, images, name, id }: IRecipe = props
  const delRecipe: any = props.delRecipe
  let history = useHistory();

  const handleClick = () => {
    history.push(`/recipe/${id}`);
  };
  
  const removeRecipe = (event:any) => {
    event.stopPropagation();
    delRecipe(id)
  }

  const getImage = () => {
    if (Array.isArray(images)) return images[0]
    return images
  }

  return (
    <div className={styles.card} onClick={handleClick}>
      <span className={styles.delButton} onClick={removeRecipe}>X</span>
      <div className={styles.title}>
        {name}
      </div>
      <img src={getImage()} alt="" />
      <div>
        <span>{category} </span>
        <span> | </span>
        <span>{cuisine}</span>
      </div>
    </div>
  );
};

export default RecipeCard;
