import { useCallback,useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits, getPosterUrl } from '../../api/tmdbAPI';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import styles from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

    const getCast = useCallback(async () => {
    if (!movieId) return;

    setIsLoading(true);
    setError(null);
    try {
      const castData = await fetchMovieCredits(movieId);
      setCast(castData);
    } catch (err) {
      setError(err.message);
      toast.error(`Помилка завантаження акторського складу: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [movieId]);

  useEffect(() => { getCast(); }, [getCast]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className={styles.error}>Сталася помилка: {error}</p>;
  }

  if (!isLoading && cast.length === 0) { 
    return <p className={styles.noInfo}>Інформація про акторський склад відсутня.</p>;
  }

  return (
    <div className={styles.castContainer}>
      <h3 className={styles.castTitle}>Акторський склад</h3>
      <ul className={styles.castList}>
        {cast.map(({ id, name, profile_path, character }) => (
          <li key={id} className={styles.castItem}>
            <img
              src={getPosterUrl(profile_path, 'w200')}
              alt={name}
              className={styles.actorImage}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = getPosterUrl(null, 'w200');
              }}
            />
            <div className={styles.actorInfo}>
              <p className={styles.actorName}>{name}</p>
              {character && <p className={styles.character}>Роль: {character}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;