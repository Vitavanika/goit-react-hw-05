import { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api/tmdbAPI";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import styles from "./Reviews.module.css";

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getReviews = useCallback(async () => {
    if (!movieId) return;
    setIsLoading(true);
    setError(null);
    try {
      const reviewsData = await fetchMovieReviews(movieId);
      setReviews(reviewsData);
    } catch (err) {
      setError(err.message);
      toast.error(`Помилка завантаження оглядів: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className={styles.error}>Сталася помилка: {error}</p>;
  }

  if (!isLoading && reviews.length === 0) {
    return <p className={styles.noInfo}>На цей фільм ще немає оглядів.</p>;
  }

  return (
    <div className={styles.reviewsContainer}>
      <h3 className={styles.reviewsTitle}>Огляди</h3>
      <ul className={styles.reviewsList}>
        {reviews.map(({ id, author, content, created_at }) => (
          <li key={id} className={styles.reviewItem}>
            <h4 className={styles.author}>Автор: {author}</h4>
            <p className={styles.content}>{content}</p>
            {created_at && (
              <p className={styles.date}>
                Опубліковано: {new Date(created_at).toLocaleDateString()}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
