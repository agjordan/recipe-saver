import React from "react";
import { useHistory } from "react-router-dom";
import { IRecipe } from "../Recipes/Recipes.models";
import styles from "./RecipeCard.module.scss";

const RecipeCard = ({ category, cuisine, images, name, id }: IRecipe) => {
  let history = useHistory();

//   const getDisplayName = (name: string) => {
//     return name.length > 25 ? name.slice(0, 22) + "..." : name;
//   };

  const handleClick = () => {
    history.push(`/recipe/${id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.title}>
        {name}
      </div>
      <img src={images[0]} alt="" />
      <div>
        <span>{category} </span>
        <span> | </span>
        <span>{cuisine}</span>
      </div>
    </div>
  );
};

export default RecipeCard;
