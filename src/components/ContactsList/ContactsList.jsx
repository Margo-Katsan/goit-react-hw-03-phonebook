import { ContactListItem } from "components/ContactListItem/ContactListItem"
import css from "./ContactsList.module.css"

export const ContactsList = ({ contacts, onDelete }) => {
  return (
    <ul className={css.contacts}>
      {
        contacts.map(contact => {
          return <ContactListItem contact={contact} onDelete={onDelete} />
        })
      }
    </ul>
  )
}