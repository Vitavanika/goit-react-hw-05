import PropTypes from 'prop-types';
import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  return (
    <ul className={styles.movieList}>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default MovieList;
