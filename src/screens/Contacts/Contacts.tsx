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
    <div className="mx-auto w-11/12">
      <h1>Contacts</h1>
      <ul>
        {store.contacts.map(contact => (
          <li key={contact.id}>
            <Link
              to={`/contacts/${contact.id}`}
              className="mb-2 flex rounded-md border p-1 hover:shadow-xl">
              <img
                className="w-16 rounded-full"
                src={`/users/${contact.avatar}`}
                alt={contact.name}
              />
              <div className="ms-1 flex flex-col px-2">
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
