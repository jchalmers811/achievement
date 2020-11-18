import React, { useState } from "react";
import useSearch, { SearchResults } from "../../hooks/useSearch";
import SearchInput from "../../components/searchInput/searchInput";
import List from "../../components/list/list";
import FloatingButton from "../../components/floatingButton/floatingButton";

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

  const { items, loading, error }: SearchResults = useSearch(query, page);

  const handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuery(event.target.value);
    setPage(1);
  };

  const searchInputProps = {
    placeholder: "search achievements",
    handleSearch: handleSearch,
  };

  const floatingButtonProps = {
    text: "Add",
    handleClick: handleAddClick,
  };

  return (
    <section>
      <SearchInput {...searchInputProps} query={query}></SearchInput>
      <List items={items} loading={loading}></List>
      <FloatingButton {...floatingButtonProps}></FloatingButton>
    </section>
  );
};

export default AchievementSearch;