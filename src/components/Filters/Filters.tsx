import React, { FC, memo, useCallback, useState } from "react";
import styles from "./Filters.module.scss";

type FilterProps = {
  cuisines: string[];
  categories: string[];
  setFilters: any;
  activeFilters: any;
}

const Filters: FC<FilterProps> = ({
  cuisines,
  categories,
  setFilters,
  activeFilters,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleFilters = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded])

  const handleChange = useCallback(() => {
    const cuisine = (document.getElementById("cuisine") as HTMLInputElement).value;
    const category = (document.getElementById("category") as HTMLInputElement).value;

    setFilters({ cuisine: cuisine, category: category });
  }, [setFilters])

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

export default memo(Filters);
