import "./FocusedMovie.css";
import useMovie from "../hooks/useMovie";
import { motion, AnimatePresence } from "framer-motion";
import Cast from "./Cast";
import MovieInfo from "./MovieInfo";

const FocusedMovie = ({ movie, setFocusedMovie }) => {
  const { movieDetails } = useMovie(movie);

  function clickHandler() {
    setFocusedMovie(null);
  }

  return (
    <AnimatePresence>
      {movie && (
        <>
          <motion.div
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            transition={{ duration: 0.2 }}
            onClick={clickHandler}
            className={"focused-background"}
          ></motion.div>
          <div className="scroll-wrapper">
            <motion.div layout className="focused-wrapper">
              <motion.img
                transition={{ duration: 0.3 }}
                layoutId={movie.id}
                className="focused-img"
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
                alt={movie.original_title}
              />
              <motion.div
                initial={{ y: "-100%", x: "50%", opacity: 0, rotate: 120 }}
                animate={{
                  y: 0,
                  x: 0,
                  opacity: 1,
                  rotate: 0,
                  transition: {
                    duration: 1,
                    ease: "easeInOut",
                    type: "spring",
                    stiffness: 100,
                  },
                }}
                exit={{
                  y: "-100%",
                  x: "50%",
                  opacity: 0,
                  rotate: 120,
                  transition: { duration: 0.2 },
                }}
                className="star-container"
              >
                <svg className="star" viewBox="0 0 90 90 ">
                  <path d="M 45 2.024 C 45 2.024 45 2.024 45 2.024 c -1.398 0 -2.649 0.778 -3.268 2.031 L 29.959 27.911 c -0.099 0.2 -0.29 0.338 -0.51 0.37 L 3.122 32.107 c -1.383 0.201 -2.509 1.151 -2.941 2.48 c -0.432 1.329 -0.079 2.76 0.922 3.736 l 19.049 18.569 c 0.16 0.156 0.233 0.38 0.195 0.599 L 15.85 83.71 c -0.236 1.377 0.319 2.743 1.449 3.564 c 1.129 0.821 2.6 0.927 3.839 0.279 l 23.547 -12.381 c 0.098 -0.051 0.206 -0.077 0.314 -0.077 C 51.721 53.905 50.301 28.878 45 2.024 z" />
                  <path d="M 45 2.024 C 45 2.024 45 2.024 45 2.024 c 1.398 0 2.649 0.778 3.268 2.031 l 11.773 23.856 c 0.099 0.2 0.29 0.338 0.51 0.37 l 26.326 3.826 c 1.383 0.201 2.509 1.151 2.941 2.48 c 0.432 1.329 0.079 2.76 -0.922 3.736 L 69.847 56.892 c -0.16 0.156 -0.233 0.38 -0.195 0.599 L 74.15 83.71 c 0.236 1.377 -0.319 2.743 -1.449 3.564 c -1.129 0.821 -2.6 0.927 -3.839 0.279 L 45.315 75.172 c -0.098 -0.051 -0.206 -0.077 -0.314 -0.077 C 37.08 54.593 38.849 29.395 45 2.024 z" />
                </svg>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    transition: { duration: 0.2, delay: 0.5 },
                  }}
                  className="movie-score"
                >
                  {movie.vote_average}
                </motion.span>
              </motion.div>
              <motion.div
                initial={{ x: -50, scaleX: 0.5, opacity: 0 }}
                animate={{
                  x: 0,
                  scaleX: 1,
                  opacity: 1,
                  transition: { delay: 0.3 },
                }}
                exit={{
                  y: "-50%",
                  rotate: -30,
                  opacity: 0,
                  transition: { duration: 0.2 },
                }}
                className="focused-container movie-info-container"
              >
                <MovieInfo movie={movieDetails} />
              </motion.div>
              <motion.div
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
                exit={{
                  y: 100,
                  rotate: 30,
                  opacity: 0,
                  transition: { duration: 0.3, delay: 0.05 },
                }}
                transition={{ duration: 0.3 }}
                className="focused-container cast-container"
              >
                <Cast cast={movieDetails.cast} />
              </motion.div>
              <motion.div
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.5 } }}
                exit={{
                  y: 150,
                  rotate: -30,
                  opacity: 0,
                  transition: { duration: 0.2 },
                }}
                transition={{ duration: 0.3, type: "spring" }}
                className="focused-container movie-review-container"
              >
                <p className="movie-review">{movieDetails.overview}</p>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FocusedMovie;
