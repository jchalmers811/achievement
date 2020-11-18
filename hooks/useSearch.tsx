import { useEffect, useState } from "react";
// import axios, { Canceler } from "axios";

export interface SearchResults {
  loading: boolean;
  error: boolean;
  items: any[];
  hasMore: boolean;
}

const fetctAchievements = async (name: string, page: number) => {
  const res: Response = await fetch(
    `api/achievements?name=${name}&page=${page}`
  );
  return res.json();
};

const useSearch = (query, page): SearchResults => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [items, setItems] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

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
          return [...new Set([...prevItems, ...achievements.map((item) => item._id)])];
        });
        setHasMore(achievements.length > 0);
        setLoading(false);
      } catch (e) {
        setError(true);
      }
    })();

    // let cancel: Canceler;
    // axios({
    //   method: "GET",
    //   url: "http://openlibrary.org/search.json",
    //   params: {
    //     q: query,
    //     page,
    //   },
    //   cancelToken: new axios.CancelToken((c) => (cancel = c)),
    // })
    //   .then((res) => {
    //     setItems((prevItems) => {
    //       return [
    //         ...new Set([
    //           ...prevItems,
    //           ...res.data.docs.map((item) => item.title),
    //         ]),
    //       ];
    //     });
    //     setHasMore(res.data.docs.length > 0);
    //     setLoading(false);
    //   })
    //   .catch((e) => {
    //     if (axios.isCancel(e)) {
    //       return;
    //     }
    //     setError(true);
    //   });
    // return () => cancel();
  }, [query, page]);

  return {
    loading,
    error,
    items,
    hasMore,
  };
};

export default useSearch;
