import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useStore from '@/store';
import styles from './Contacts.module.css';

const Contacts: FC = () => {
  const store = useStore();
  const navigate = useNavigate();

  function handleAddClick() {
    navigate('/contacts/new');
  }

  return (
    <div className={styles.container}>
      <h1>Contacts</h1>
      <ul>
        {store.contacts.map(contact => (
          <li key={contact.id}>
            <Link to={`/contacts/${contact.id}`}>
              <img src={`/users/${contact.avatar}`} alt={contact.name} />
              <div>
                <span>{contact.name}</span>
                <span>{contact.email}</span>
                <span>
                  {contact.phone.mobile}(m)
                  {contact.phone.work ? ` / ${contact.phone.work}(w)` : null}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <button className="btn-success" onClick={handleAddClick}>
        Add Contact
      </button>
    </div>
  );
};

export default Contacts;
