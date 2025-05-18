import { useState, useEffect, useRef, Suspense } from 'react';
import { useParams, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { fetchMovieDetails, getPosterUrl } from '../../api/tmdbAPI';
import Loader from '../../components/Loader/Loader';
import toast from 'react-hot-toast';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate(); 

  const backLinkLocationRef = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const details = await fetchMovieDetails(movieId);
        setMovie(details);
      } catch (err) {
        setError(err.message);
        toast.error(`Помилка завантаження деталей фільму: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) { 
        getMovieDetails();
    }
  }, [movieId, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className={styles.error}>Сталася помилка: {error}. Можливо, фільм не знайдено.</p>;
  }

  if (!movie && !isLoading) { 
    return <p className={styles.noInfo}>Інформація про фільм не знайдена.</p>; 
  }
  
  if (!movie) {
      return <Loader />; 
  }

  const posterUrl = getPosterUrl(movie.poster_path, 'w500');
  const userScore = movie.vote_average ? Math.round(movie.vote_average * 10) : 'N/A';
  const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A';
  const genres = movie.genres?.map(genre => genre.name).join(', ') || 'N/A';

  return (
    <div className={styles.movieDetailsPage}>
      <Link to={backLinkLocationRef.current} className={styles.backLink}>
        ← Повернутися назад
      </Link>

      <div className={styles.mainInfo}>
        <img
          src={posterUrl}
          alt={movie.title || 'Movie poster'}
          className={styles.poster}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = getPosterUrl(null, 'w500');
          }}
        />
        <div className={styles.description}>
          <h1 className={styles.title}>
            {movie.title} ({releaseYear})
          </h1>
          <p className={styles.score}>Рейтинг користувачів: {userScore}%</p>
          <h2 className={styles.sectionTitle}>Огляд</h2>
          <p className={styles.overview}>{movie.overview || 'Огляд відсутній.'}</p>
          <h2 className={styles.sectionTitle}>Жанри</h2>
          <p className={styles.genres}>{genres}</p>
        </div>
      </div>

      <div className={styles.additionalInfo}>
        <h3 className={styles.additionalTitle}>Додаткова інформація</h3>
        <ul className={styles.navList}>
          <li>
            <Link to="cast" state={{ from: backLinkLocationRef.current }} className={styles.navLink}>
              Акторський склад
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLinkLocationRef.current }} className={styles.navLink}>
              Огляди
            </Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;