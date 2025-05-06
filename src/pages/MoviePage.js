import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col } from "antd";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY`
      );
      setMovies(res.data.results);
    };
    fetchMovies();
  }, []);

  return (
    <Row gutter={[16, 16]}>
      {movies.map((movie) => (
        <Col key={movie.id} xs={24} sm={12} md={8} lg={6}>
          <Card
            hoverable
            cover={
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            }
          >
            <Card.Meta title={movie.title} description={movie.release_date} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MoviePage;
