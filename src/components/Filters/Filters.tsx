import React, { useState } from "react";
import styles from "./Filters.module.scss";

interface IFilterProps {
  cuisines: string []
  categories: string []
}

const Filters = ({cuisines, categories}: IFilterProps) => {

  const [expanded, setExpanded] = useState(false);

  const toggleFilters = () => {
    setExpanded(!expanded);
    console.log(new Set(cuisines), new Set(categories))
  };



  return (
    <div className={styles.filtersContainer} >
      {expanded ? (
        <div className={styles.expandedContent}>
          <div className={styles.expandButton} onClick={toggleFilters}>
            {">"}
            <br />
            {">"}
          </div>
          <div className={styles.dropdowns}>
          <div>Filters</div>
          <select name="cuisine" id="" defaultValue='All'>
            <option value="All">All</option>
            {cuisines.map(cuisine => <option key={cuisine} value={cuisine}>{cuisine}</option> )}
          </select>
          <select name="category" id="" defaultValue='All'>
            <option value="All">All</option>
            {categories.map(category => <option key={category} value={category}>{category}</option> )}
          </select>
          </div>
        </div>
      ) : (
        <div className={styles.expandButton} onClick={toggleFilters}>
          {"<"}
          <br />
          {"<"}
        </div>
      )}
    </div>
  );
}

export default Filters;
