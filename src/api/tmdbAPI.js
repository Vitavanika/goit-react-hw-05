import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'https://api.themoviedb.org/3';
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
if (!ACCESS_TOKEN) {
  toast.error('TMDB API Token не знайдено! Додайте VITE_TMDB_API_TOKEN у ваш .env файл.');
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    Accept: 'application/json'
  },
});

export const fetchTrendingMovies = async () => {
  try {
    const { data } = await api.get('/trending/movie/day');
    return data.results;
  } catch (error) {
    toast.error('Не вдалося отримати трендові фільми.');
    console.error('Помилка запиту:', error);
    throw error;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const { data } = await api.get('/search/movie', {
      params: {
        query: query,
        page: page,
        include_adult: false
      }
    });
    return data;
  } catch (error) {
    console.error('Помилка пошуку фільмів:', error);
    throw error;
  }
};

export const fetchMovieDetails = async movieId => {
  try {
    const { data } = await api.get(`/movie/${movieId}`);
    return data;
  } catch (error) {
    console.error('Помилка запиту деталей фільму:', error);
    throw error;
  }
};

export const fetchMovieCredits = async movieId => {
  try {
    const { data } = await api.get(`/movie/${movieId}/credits`);
    return data.cast;
  } catch (error) {
    console.error('Помилка запиту акторського складу:', error);
    throw error;
  }
};

export const fetchMovieReviews = async movieId => {
  try {
    const { data } = await api.get(`/movie/${movieId}/reviews`, );
    return data.results;
  } catch (error) {
    console.error('Помилка запиту оглядів фільму:', error);
    throw error;
  }
};

export const getPosterUrl = (path, size = 'w500') => {
  if (!path) {
    return '/no-image.png';
  }
  return `https://image.tmdb.org/t/p/${size}${path}`;
};