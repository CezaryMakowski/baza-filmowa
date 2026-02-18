import { useEffect, useState } from "react";
import useFilters from "./useFilters";

export default function useMovies(
  query,
  page,
  activeGenre,
  isSearchCut,
  setSearchedPage,
  setIsLoading,
  setIsError
) {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const { filteredMovies } = useFilters(
    searchedMovies,
    activeGenre,
    isSearchCut
  );
  const [isMore, setIsMore] = useState(true);

  useEffect(() => {
    dataFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  useEffect(() => {
    setSearchedMovies([]);
    setSearchedPage(3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  async function dataFetch() {
    const API = process.env.REACT_APP_API_KEY;
    let result;
    const usableQuery = query.replace(" ", "+");
    setIsError(false);
    setIsLoading(true);
    try {
      if (page === 3) {
        const dataPage1 = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${usableQuery}&api_key=${API}&page=1`
        );
        const dataPage2 = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${usableQuery}&api_key=${API}&page=2`
        );
        const dataPage3 = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${usableQuery}&api_key=${API}&page=3`
        );
        const resultPage1 = await dataPage1.json();
        const resultPage2 = await dataPage2.json();
        const resultPage3 = await dataPage3.json();

        result = [
          ...resultPage1.results,
          ...resultPage2.results,
          ...resultPage3.results,
        ];
      } else {
        const data = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${usableQuery}&api_key=${API}&page=${page}`
        );
        result = await data.json();
        result = [...result.results];
      }
      for (let i = result.length - 1; i >= 0; i--) {
        if (!result[i].poster_path) {
          result.splice(i, 1);
        }
      }
      setIsLoading(false);
      setSearchedMovies((prevResults) => [...prevResults, ...result]);

      if (result.total_pages === page) {
        setIsMore(false);
      } else {
        setIsMore(true);
      }
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      console.error(err);
    }
  }
  return [filteredMovies, isMore];
}
