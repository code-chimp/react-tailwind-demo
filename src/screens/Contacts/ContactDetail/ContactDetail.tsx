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

  return (
    <div className="mx-auto flex w-full max-w-[65rem] rounded-md border p-1">
      {contact ? (
        <>
          <img
            className="max-h-52 rounded-md"
            src={`/users/${contact.avatar}`}
            alt={`${contact.name}'s avatar`}
          />

          <div className="flex flex-grow flex-col p-1">
            <h1>{contact.name}</h1>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <div className="flex">
              <div className="flex w-1/2 flex-col">
                <span>
                  <a href={`tel:${contact.phone.mobile}`}>{contact.phone.mobile}</a> main
                </span>
                {contact.phone.work ? (
                  <span>
                    <a href={`tel:${contact.phone.work}`}>{contact.phone.work}</a> work
                  </span>
                ) : null}
                <div className="min-h-[60px] p-1">
                  <h3>Notes:</h3>
                  <p>{contact.notes}</p>
                </div>
              </div>
              <div className="flex w-1/2 flex-col">
                <span>{contact.address}</span>
                <span>
                  {contact.city}, {contact.state} {contact.postalCode}
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="btn-primary" onClick={handleEditClick}>
                Edit
              </button>
              <button className="btn-danger" onClick={handleDeleteClick}>
                Delete
              </button>
              <button onClick={handleBackClick}>Back</button>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ContactDetail;
