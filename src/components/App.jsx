import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');

    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = e => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    } else if (e.target.name === 'number') {
      setNumber(e.target.value);
    } else if (e.target.name === 'filter') {
      setFilter(e.target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
    setName('');
    setNumber('');
  };

  const handleDelete = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <Div>
      <h1>Phonebook</h1>
      <ContactForm
        name={name}
        number={number}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handleChange} />
      <ContactList contacts={filteredContacts} onDelete={handleDelete} />
    </Div>
  );
};
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default App;
