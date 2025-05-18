import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { getPosterUrl } from '../../api/tmdbAPI';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
  const location = useLocation();
  const posterUrl = getPosterUrl(movie.poster_path, 'w300');

  return (
    <li className={styles.movieCard}>
      <Link to={`/movies/${movie.id}`} state={{ from: location }}>
        <img
          src={posterUrl}
          alt={movie.title || movie.name || 'Movie poster'}
          className={styles.poster}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = getPosterUrl(null, 'w300');
          }}
        />
        <div className={styles.info}>
          <h3 className={styles.title}>{movie.title || movie.name}</h3>
          {movie.release_date && (
            <p className={styles.releaseDate}>Рік: {movie.release_date.substring(0, 4)}</p>
          )}
           {typeof movie.vote_average === 'number' && (
            <p className={styles.rating}>Рейтинг: {movie.vote_average.toFixed(1)}</p>
          )}
        </div>
      </Link>
    </li>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string, 
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
};

export default MovieCard;