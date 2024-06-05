import { Link } from 'react-router-dom';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.container}>
      <h3>
        <Link to="/">Tailwind Demo</Link> &copy; {new Date().getFullYear()}
      </h3>
      <nav>
        <ul>
          <li>
            <Link to="/contacts">Contacts</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
