import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import IContact from '@/@interfaces/IContact.ts';
import useStore from '@/store';

const ContactDetail: FC = () => {
  const navigate = useNavigate();
  const store = useStore();
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<IContact | null>(null);

  useEffect(() => {
    const existing = store.contacts.find(c => c.id === id);

    if (existing) {
      setContact(existing);
    } else {
      navigate('..', { relative: 'path' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleBackClick() {
    navigate('..', { relative: 'path' });
  }

  function handleDeleteClick() {
    store.deleteContact(contact!.id);
    navigate('..', { relative: 'path' });
  }

  function handleEditClick() {
    navigate('edit', { relative: 'path' });
  }

  return contact ? (
    <div>
      <img src={`/users/${contact.avatar}`} alt={contact.name} />

      <div>
        <h1>{contact.name}</h1>

        <div>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
          <button onClick={handleBackClick}>Back</button>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default ContactDetail;
