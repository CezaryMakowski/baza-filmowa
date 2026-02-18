import Movie from "./components/movie";
import Filters from "./components/Filters";
import { useState } from "react";
import useMovies from "./hooks/useMovies";
import useFilters from "./hooks/useFilters";
import useSearch from "./hooks/useSearch";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import FocusedMovie from "./components/FocusedMovie";
import "./App.css";

export default function App() {
  const [activeGenre, setActiveGenre] = useState(0);
  const [page, setPage] = useState(3);
  const [searchedPage, setSearchedPage] = useState(3);
  const [searchValue, setSearchValue] = useState("");
  const [focusedMovie, setFocusedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isCut, setIsCut] = useState(false);
  const [isSearchCut, setIsSearchCut] = useState(false);

  const { movies, isMore } = useMovies(page, setIsLoading, setIsError);
  const { filteredMovies } = useFilters(movies, activeGenre, isCut);
  const [searchedMovies, isSearchingMore] = useSearch(
    searchValue,
    searchedPage,
    activeGenre,
    isSearchCut,
    setSearchedPage,
    setIsLoading,
    setIsError
  );

  function nextPageHandler() {
    if (isCut || isSearchCut) {
      setIsCut(false);
      setIsSearchCut(false);
      return;
    }
    isSearching
      ? setSearchedPage((prevPage) => prevPage + 1)
      : setPage((prevPage) => prevPage + 1);
  }

  return (
    <>
      <div className="movies-background"></div>
      <FocusedMovie movie={focusedMovie} setFocusedMovie={setFocusedMovie} />
      <Filters
        setActiveGenre={setActiveGenre}
        setSearchValue={setSearchValue}
        setIsSearching={setIsSearching}
        setIsCut={setIsCut}
        setIsSearchCut={setIsSearchCut}
      />
      <LayoutGroup>
        {!isSearching && (
          <InfiniteScroll
            dataLength={filteredMovies.length}
            next={nextPageHandler}
            hasMore={isMore}
          >
            <div className="movie-grid">
              <AnimatePresence mode="popLayout">
                {filteredMovies.map((movie) => {
                  return (
                    <Movie
                      key={movie.id}
                      movieInfo={movie}
                      setFocusedMovie={setFocusedMovie}
                      onError={(e) => console.log(e)}
                    />
                  );
                })}
              </AnimatePresence>
            </div>
          </InfiniteScroll>
        )}
        {isSearching && (
          <InfiniteScroll
            dataLength={searchedMovies.length}
            next={nextPageHandler}
            hasMore={isSearchingMore}
          >
            <div className="movie-grid">
              <AnimatePresence mode="popLayout">
                {searchedMovies.map((movie) => {
                  return (
                    <Movie
                      key={movie.id}
                      movieInfo={movie}
                      setFocusedMovie={setFocusedMovie}
                    />
                  );
                })}
              </AnimatePresence>
            </div>
          </InfiniteScroll>
        )}
        {isLoading && (
          <div className="loading-wrapper">
            <motion.svg
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
              className="loading"
              width="80"
              height="80"
              viewBox="0 0 85 85"
            >
              <circle cx="42.5" cy="42.5" r="40" />
            </motion.svg>
          </div>
        )}
        {isError && (
          <div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
            className="error"
          >
            Error...
          </div>
        )}
      </LayoutGroup>
    </>
  );
}
