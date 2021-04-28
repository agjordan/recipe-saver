import React, { useState } from "react";
import styles from "./Filters.module.scss";

interface IFilterProps {
  cuisines: string[];
  categories: string[];
  setFilters: any;
  activeFilters: any;
}

const Filters = ({
  cuisines,
  categories,
  setFilters,
  activeFilters,
}: IFilterProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleFilters = () => {
    setExpanded(!expanded);
    console.log(new Set(cuisines), new Set(categories));
  };

  const handleChange = () => {
    const cuisine = (document.getElementById("cuisine") as HTMLInputElement).value;
    const category = (document.getElementById("category") as HTMLInputElement).value;

    setFilters({ cuisine: cuisine, category: category });
  };

  return (
    <div className={styles.filtersContainer}>
      {expanded ? (
        <div className={styles.expandedContent}>
          <div className={styles.expandButton} onClick={toggleFilters}>
            {">"}
            <br />
            {">"}
          </div>
          <div className={styles.dropdowns}>
            <div className={styles.dropdownsTitle}>Filters</div>
            <select
              name="cuisine"
              id="cuisine"
              defaultValue={activeFilters.cuisine}
              onChange={handleChange}
            >
              <option value="">All Cuisines</option>
              {cuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
            <select
              name="category"
              id="category"
              defaultValue={activeFilters.category}
              onChange={handleChange}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
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
};

export default Filters;
