import React, { useState, useEffect } from 'react';
import { ContactForm } from '../../components/ContactForm/ContactForm';
import { ContactList } from '../../components/ContactList/ContactList';
import { Filter } from '../../components/Filter/Filter';
import s from '../../components/App/App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    try {
      const json = localStorage.getItem('contacts');
      const savedContacts = JSON.parse(json);

      if (savedContacts) {
        setContacts(savedContacts);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    const loweredCase = newContact.name.toLowerCase().trim();
    const exists = contacts.some(
      (contact) => contact.name.toLowerCase().trim() === loweredCase
    );

    if (exists) {
      alert(`${newContact.name} is already in contacts!`);
    } else {
      setContacts([...contacts, newContact]);
    }
  };

  const filteredContacts = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <section className={s.content}>
      <div className={s.content__container}>
        <ContactForm addContact={addContact} />
        <ContactList contacts={filteredContacts()} deleteContact={deleteContact}>
          <Filter filter={filter} addFilter={(e) => setFilter(e.currentTarget.value)} />
        </ContactList>
      </div>
    </section>
  );
};
