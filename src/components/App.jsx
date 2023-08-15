import { Component } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactsList } from "./ContactsList/ContactsList";
import { Filter } from "./Filter/Filter";
import css from "./App.module.css"

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'}
    ],
    filter: ''
  }

  componentDidMount() {
    const savedContacts = localStorage.getItem('Contacts');
    if (savedContacts !== null) {
      this.setState({
        contacts: JSON.parse(savedContacts)
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("Contacts", JSON.stringify(this.state.contacts));
    }
  }

  changeNameFilter = (newName) => {
    this.setState({
      filter: newName,
    })
  }

  addContact = newContact => {
    const isContactExist = this.state.contacts.filter(contact => contact.name === newContact.name).length !== 0;
    if (isContactExist) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact]
      }
    })
  }

  handleDelete = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== contactId)
      }
    })  
  }

  render() {
    const { contacts, filter } = this.state;
    const visibleContactItems = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
    return (
      <div className={css.phonebook}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onAdd={this.addContact} />
        <h2 className={css.secondTitle}>Contacts</h2>
        <Filter nameFilter={filter} onChange={this.changeNameFilter} />
        <ContactsList contacts={visibleContactItems} onDelete={this.handleDelete}/>
      </div>
    );
  }
} 