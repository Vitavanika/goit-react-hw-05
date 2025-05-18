import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const getLinkClass = ({ isActive }) => isActive ? styles.activeLink : styles.link;
const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={getLinkClass}>Головна</NavLink>
      <NavLink to="/movies" className={getLinkClass}>Фільми</NavLink>
    </nav>
  );
};

export default Navigation;
