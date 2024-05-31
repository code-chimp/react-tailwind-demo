import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useStore from '@/store';

const Contacts: FC = () => {
  const store = useStore();
  const navigate = useNavigate();

  function handleAddClick() {
    navigate('/contacts/new');
  }

  return (
    <div>
      <h1>Contacts</h1>
      <ul>
        {store.contacts.map(contact => (
          <li key={contact.id}>
            <Link to={`/contacts/${contact.id}`}>
              <img src={`/users/${contact.avatar}`} alt={contact.name} width="50px" />{' '}
              {contact.name}
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={handleAddClick}>Add Contact</button>
    </div>
  );
};

export default Contacts;
