import styles from "../styles/achievementSearch.module.scss";
import React, { useState, MutableRefObject, useRef, useCallback } from "react";
import useSearch, { SearchResults } from "../../hooks/useSearch";
import SearchList from "../../components/achievementSearch/searchList";

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

const AchievementSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { items, hasMore, loading, error }: SearchResults = useSearch(
    query,
    page
  );
  const observer: MutableRefObject<IntersectionObserver> = useRef();

  const handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuery(event.target.value);
    setPage(1);
  };

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
          console.log("visible");
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (item) {
        observer.current.observe(item);
      }
    },
    [loading, hasMore]
  );


  const searchListProps = {
    items: items,
    loading: loading,
    error: error,
    query: query,
    handleSearch: handleSearch,
    setPage: setPage,
  };

  return <SearchList {...searchListProps}></SearchList>
};


export default AchievementSearch;
