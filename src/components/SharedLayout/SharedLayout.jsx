import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import styles from './SharedLayout.module.css';
import { Toaster } from 'react-hot-toast'; 

const SharedLayout = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Navigation />
      </header>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Vitavanika. Кінопошук.</p>
      </footer>
      <Toaster position="top-right" reverseOrder={false} 
        toastOptions={{
          style: {
            background: '#00796b',
            color: '#e0f2f1',
          },
          success: {
            iconTheme: {
              primary: '#a7ffeb',
              secondary: '#004d40',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff8a80',
              secondary: '#b71c1c',
            },
          },
        }}
      /> 
    </div>
  );
};

export default SharedLayout;