import { useEffect, useState } from "react";

export interface SearchResults {
  loading: boolean;
  error: boolean;
  items: any[];
}

const fetctAchievements = async (name: string, page: number) => {
  const res: Response = await fetch(
    `api/achievements?name=${name}&page=${page}`
  );
  return res.json();
};

const useSearch = (query, page): SearchResults => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(false);
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    setItems([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    (async () => {
      try {
        const achievements = await fetctAchievements(query, page);
        setItems((prevItems) => {
          return [
            ...new Set([...prevItems, ...achievements.map((item) => item._id)]),
          ];
        });
        setLoading(false);
      } catch (e) {
        setError(e)
      }
    })();
  }, [query, page]);

  return {
    loading,
    error,
    items,
  };
};

export default useSearch;
