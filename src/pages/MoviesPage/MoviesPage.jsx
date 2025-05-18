import { useCallback, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../api/tmdbAPI';
import MovieList from '../../components/MovieList/MovieList';
import SearchBar from '../../components/SearchBar/SearchBar';
import Loader from '../../components/Loader/Loader';
import toast from 'react-hot-toast';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const fetchSearchedMovies = useCallback(async () => {
    if (!query) {
      setMovies([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await searchMovies(query);
      setMovies(data.results.length > 0 ? data.results : []);
      if (data.results.length === 0) {
        toast.error(
          "За вашим запитом нічого не знайдено. Спробуйте інший запит."
        );
      }
    } catch (err) {
      setError(err.message);
      toast.error(`Помилка пошуку фільмів: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchSearchedMovies();
  }, [fetchSearchedMovies]);

  const handleSearchSubmit = searchQuery => {
    if (searchQuery.trim() === '') {
      toast.error('Будь ласка, введіть пошуковий запит.');
      setSearchParams({});
      setMovies([]);
      return;
    }
    setSearchParams({ query: searchQuery });
  };

  return (
    <div className={styles.moviesPage}>
      <SearchBar onSubmit={handleSearchSubmit} initialQuery={query} />
      {isLoading && <Loader />}
      {error && <p className={styles.error}>Сталася помилка: {error}</p>}
      {!isLoading && !error && movies.length > 0 && <MovieList movies={movies} />}
      {!isLoading && !error && movies.length === 0 && query && (
        <p className={styles.noResults}>За запитом "{query}" нічого не знайдено.</p>
      )}
    </div>
  );
};

export default MoviesPage;
