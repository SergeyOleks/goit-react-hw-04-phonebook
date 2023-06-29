import css from './App.module.css';
import { Component } from 'react';

import ContactList from '../ContactList/ContactList';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    // const { contacts } = this.state;
    try {
      const localStorageContacts = JSON.parse(localStorage.getItem('contacts'));

      if (localStorageContacts.length > 0) {
        this.filterContacts = localStorageContacts;
        this.setState({ contacts: localStorageContacts });
      }
    } catch (err) {}
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contact) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  filterContacts = this.state.contacts;

  handleFilterQuery = event => {
    const { value } = event.currentTarget;
    const { contacts } = this.state;
    this.setState({ filter: value });

    this.filterContacts = contacts.filter(el =>
      el.name.toLowerCase().includes(value.toLowerCase())
    );
  };

  handleDelItem = event => {
    const { contacts } = this.state;
    const { name } = event.currentTarget;

    let delEl = contacts.findIndex(({ id }) => id === name);
    contacts.splice(delEl, 1);
    delEl = this.filterContacts.findIndex(({ id }) => id === name);
    this.filterContacts.splice(delEl, 1);
    this.setState({ contacts });
  };

  formSubmitHandler = data => {
    const { contacts } = this.state;
    const findElement = contacts.some(contact => contact.name === data.name);
    findElement
      ? alert(`${data.name} is alredy in contact`)
      : contacts.push(data);
    this.setState({ contacts });
    this.filterContacts = contacts;
  };

  render() {
    // const { contacts } = this.state;

    return (
      <div className={css.app}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter onChange={this.handleFilterQuery} />
        <ContactList
          contacts={this.filterContacts}
          onClick={this.handleDelItem}
        />
      </div>
    );
  }
}

export default App;
