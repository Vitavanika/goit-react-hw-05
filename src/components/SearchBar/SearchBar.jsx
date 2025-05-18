import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      toast.error('Будь ласка, введіть щось для пошуку.');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        className={styles.searchInput}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Пошук фільмів..."
        value={query}
        onChange={handleChange}
      />
      <button type="submit" className={styles.searchButton}>
        Пошук
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialQuery: PropTypes.string,
};

export default SearchBar;
