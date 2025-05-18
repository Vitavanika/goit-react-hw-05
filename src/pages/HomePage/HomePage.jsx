import { useCallback, useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../api/tmdbAPI';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import toast from 'react-hot-toast';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

const getTrendingMovies = useCallback(async () => {
  setIsLoading(true);
  setError(null);
  try {
    const movies = await fetchTrendingMovies();
    setTrendingMovies(movies);
  } catch (err) {
    setError(err.message);
    toast.error(`Помилка завантаження трендових фільмів: ${err.message}`);
  } finally {
    setIsLoading(false);
  }
}, []);

useEffect(() => {
  getTrendingMovies();
}, [getTrendingMovies]);

  return (
    <div className={styles.homePage}>
      <h1 className={styles.title}>Популярні сьогодні</h1>
      {isLoading && <Loader />}
      {error && <p className={styles.error}>Сталася помилка: {error}</p>}
      {!isLoading && !error && trendingMovies.length > 0 && (
        <MovieList movies={trendingMovies} />
      )}
      {!isLoading && !error && trendingMovies.length === 0 && (
        <p className={styles.noResults}>Сьогодні немає популярних фільмів.</p>
      )}
    </div>
  );
};

export default HomePage;