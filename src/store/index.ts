import { create } from 'zustand';

import IContact from '@/@interfaces/IContact.ts';
import { seedData } from '@/seedData.ts';

type Store = {
  contacts: IContact[];
  addContact: (contact: Omit<IContact, 'id' | 'updatedAt'>) => void;
  updateContact: (contact: IContact) => void;
  deleteContact: (id: string) => void;
  loadContacts: () => Promise<void>;
};

const useStore = create<Store>(set => ({
  contacts: [],
  addContact: contact =>
    set(state => {
      const maxId = state.contacts.reduce(
        (max: number, contact: IContact) => Math.max(max, +contact.id.slice(1)),
        0,
      );

      const contacts = [
        ...state.contacts,
        {
          ...contact,
          id: `c${maxId + 1}`,
          createdAt: new Date().toISOString(),
          updatedAt: null,
        },
      ];

      localStorage.setItem('contacts', JSON.stringify(contacts));

      return { contacts };
    }),
  updateContact: contact =>
    set(state => {
      const contacts = state.contacts.map(c =>
        c.id === contact.id ? { ...contact, updatedAt: new Date().toISOString() } : c,
      );

      localStorage.setItem('contacts', JSON.stringify(contacts));

      return { contacts };
    }),
  deleteContact: id =>
    set(state => {
      const contacts = state.contacts.filter(c => c.id !== id);

      localStorage.setItem('contacts', JSON.stringify(contacts));

      return { contacts };
    }),
  loadContacts: () =>
    new Promise<void>(resolve => {
      const contacts = localStorage.getItem('contacts');

      if (contacts) {
        set({ contacts: JSON.parse(contacts) });
      } else {
        const contacts = seedData.slice();

        localStorage.setItem('contacts', JSON.stringify(contacts));

        set({ contacts });
      }

      resolve();
    }),
}));

export default useStore;
