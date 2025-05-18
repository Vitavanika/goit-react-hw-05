import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Ой! Сторінку не знайдено.</p>
      <p className={styles.suggestion}>
        Схоже, ви перейшли за неіснуючим посиланням.
      </p>
      <Link to="/" className={styles.homeLink}>
        Повернутися на Головну
      </Link>
    </div>
  );
};

export default NotFoundPage;