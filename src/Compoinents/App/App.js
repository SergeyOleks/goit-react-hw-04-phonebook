import css from './App.module.css';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactList from '../ContactList/ContactList';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filterContacts, setFilterContacts] = useState([]);

  useEffect(() => {
    console.log('componentDidMount');
    try {
      const localStorageContacts = JSON.parse(localStorage.getItem('contacts'));
      setContacts(localStorageContacts);
      setFilterContacts(localStorageContacts);
    } catch (err) {}
  }, []);

  useEffect(() => {
    console.log('componentDidUpdate');
    contacts.length > 0 &&
      localStorage.setItem('contacts', JSON.stringify(contacts));
    // setFilterContacts(contacts);
  }, [contacts]);

  const formSubmitHandler = event => {
    event.preventDefault();
    const id = nanoid();    
    const { 0: { value: name }, 1: { value:number } } = event.currentTarget;
    const data = { id, name, number };

    if (
      contacts.length > 0 &&
      contacts.some(contact => contact.name === data.name)
    ) {
      alert(`${data.name} is alredy in contact`);
      return;
    }
    setContacts([...contacts, data]);
    setFilterContacts([...filterContacts, data]);
  };

  const handleDelItem = event => {
    const { name } = event.currentTarget;
    contacts.splice(
      contacts.findIndex(({ id }) => id === name),
      1
    );
    setContacts([...contacts]);
    filterContacts.splice(
      filterContacts.findIndex(({ id }) => id === name),
      1
    );
    setFilterContacts([...filterContacts]);
  };

  const handleFilterQuery = event => {
    const { value } = event.currentTarget;
    setFilterContacts(
      contacts.filter(el => el.name.toLowerCase().includes(value.toLowerCase()))
    );
  };

  console.log(contacts);

  return (
    <div className={css.app}>
      <h1>Phonebook</h1>
      <ContactForm onFormSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter onChange={handleFilterQuery} />
      {contacts.length > 0 && (
        <ContactList contacts={filterContacts} onClick={handleDelItem} />
      )}
    </div>
  );
};

export default App;
