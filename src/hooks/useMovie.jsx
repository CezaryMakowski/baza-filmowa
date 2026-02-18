import { useEffect, useState } from "react";

export default function useMovie(movie) {
  const [movieDetails, setMovieDetails] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    dataFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie]);

  async function dataFetch() {
    const API = process.env.REACT_APP_API_KEY;

    setIsError(false);
    if (!movie) return;
    try {
      const movieDetailsData = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API}&language=en`,
      );
      const movieCreditsData = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API}&language=en`,
      );
      const movieDetailsResults = await movieDetailsData.json();
      const movieCreditsResults = await movieCreditsData.json();
      setMovieDetails({
        ...movieDetailsResults,
        cast: [...movieCreditsResults.cast.slice(0, 5)],
      });
    } catch (err) {
      setIsError(true);
      console.error(err);
    }
  }
  return { movieDetails, isError };
}
