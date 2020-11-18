import styles from "./list.module.scss";
import React from "react";
import PropTypes from "prop-types";

const List = (props) => {
  const { items, loading, handleClick } = props;

  const mapItemsToElements: (items: string) => JSX.Element = (item) => {
    return (
      <li className={styles.gridItem} key={item}>
        {item}
      </li>
    );
  };

  return <ul className={styles.gridList}>{items.map(mapItemsToElements)}</ul>;
};

List.propTypes = {
  items: PropTypes.any.isRequired,
  loading: PropTypes.bool.isRequired,
  handleClick: PropTypes.func,
};

export default List;