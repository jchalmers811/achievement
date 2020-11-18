import styles from "./searchInput.module.scss";
import React from "react";
import PropTypes from "prop-types";

const SearchInput = (props) => {
  const { placeholder, handleSearch, query } = props;

  return (
    <input
      className={styles.search}
      placeholder={placeholder}
      value={query}
      onChange={handleSearch}
    ></input>
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default SearchInput;
