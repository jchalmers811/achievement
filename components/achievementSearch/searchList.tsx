import styles from "../styles/achievementSearch.module.scss";
import React, { MutableRefObject, useRef, useCallback } from "react";
import PropTypes from "prop-types";

const handleAddClick = async () => {
  const res = await fetch("api/achievements", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ achievement: "test2" }),
  });

  return res.json();
};

const SearchList = (props) => {
  const { items, hasMore, loading, query, handleSearch, handleSetPage } = props;
  const observer: MutableRefObject<IntersectionObserver> = useRef();

  const lastItemElementRef: (item: any) => void = useCallback(
    (item) => {
      if (loading) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
            handleSetPage((prevPage) => prevPage + 1);
        }
      });
      if (item) {
        observer.current.observe(item);
      }
    },
    [loading, hasMore]
  );

  const mapItemsToElements: (items: string, i: number) => JSX.Element = (
    item,
    i
  ) => {
    if (items.length === i + 1) {
      return (
        <li className={styles.gridItem} ref={lastItemElementRef} key={item}>
          {item}
        </li>
      );
    }
    return (
      <li className={styles.gridItem} key={item}>
        {item}
      </li>
    );
  };

  return (
    <section>
      <input
        className={styles.search}
        placeholder="search achievements"
        value={query}
        onChange={handleSearch}
      ></input>
      <ul className={styles.gridList}>{items.map(mapItemsToElements)}</ul>
      <div>{loading && "Loading..."}</div>
      <footer className={styles.footer}>
        <button onClick={handleAddClick}>Add</button>
      </footer>
    </section>
  );
};

SearchList.propTypes = {
  items: PropTypes.any.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleSetPage: PropTypes.func.isRequired,
};

export default SearchList;
