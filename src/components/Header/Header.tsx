import { FC } from 'react';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  return (
    <header className="flex w-full justify-between border-b p-4">
      <h1>
        <Link to="/">Tailwind Demo</Link>
      </h1>
      <nav>
        <ul className="flex">
          <li className="ms-4">
            <Link to="/contacts">Contacts</Link>
          </li>
          <li className="ms-4">
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
