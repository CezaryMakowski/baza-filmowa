import "./MovieInfo.css";
import { useState, useEffect } from "react";

export default function MovieInfo({ movie }) {
  const [budget, setBudget] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    if (movie.budget === undefined || movie.revenue === undefined) return;
    setBudget(movie.budget.toLocaleString("en-US").replaceAll(",", " "));
    setRevenue(movie.revenue.toLocaleString("en-US").replaceAll(",", " "));
  }, [movie]);

  return (
    <div className="movie-info-card">
      <h3 className="title">{movie.title}</h3>
      <div className="movie-info-wrapper">
        <div className="movie-info">
          <h3>Categories:</h3>
          <div className="movie-info-content-wrapper">
            {movie.genres &&
              movie.genres.map((genre, i) => {
                return (
                  <span key={i} className="movie-info-content">
                    {genre.name}
                  </span>
                );
              })}
          </div>
        </div>
        <div className="movie-info">
          <h3>Budget:</h3>
          <span className="movie-info-content gold bright">{`$ ${budget}`}</span>
          <h3 style={{ marginTop: "8px" }}>Revenue:</h3>
          <span className="movie-info-content gold bright">{`$ ${revenue}`}</span>
        </div>
        <div className="movie-info">
          <h3 style={{ marginTop: "5px" }}>Producers:</h3>
          <div className="movie-info-content-wrapper">
            {movie.production_companies &&
              movie.production_companies.map((producer, i) => {
                if (i < 3) {
                  return (
                    <span key={i} className="movie-info-content gold">
                      {producer.name}
                    </span>
                  );
                }
                return null;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
