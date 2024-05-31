import { FC } from 'react';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  return (
    <header>
      <h1>
        <Link to="/">Tailwind Demo</Link>
      </h1>
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
    </header>
  );
};

export default Header;
