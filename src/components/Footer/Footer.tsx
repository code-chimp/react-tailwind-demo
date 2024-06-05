import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="flex w-full justify-between border-t p-4">
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
