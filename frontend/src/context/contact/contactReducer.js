import {
     ADD_CONTACT,
     DELET_CONTACT,
     UPDATE_CONTACT,
     FILTER_CONTACTS,
     CLEAR_FILTER,
     CLEAR_CURRENT,
     SET_CURRENT,
     CONTACT_ERROR,
} from '../types'
import ContactForm from '../../components/contacts/ContactForm'

export default (state, action) => {
     switch (action.type) {
          case ADD_CONTACT:
               return {
                    ...state, contacts: [...state.contacts, action.payload]
               }
          case DELET_CONTACT:
               return {
                    ...state, contacts: state.contacts.filter(contact => contact.id !== action.payload)
               }
          case SET_CURRENT:
               return {
                    ...state,
                    current: action.payload
               }
          case CLEAR_CURRENT:
               return {
                    ...state,
                    current: null
               }
          case UPDATE_CONTACT:
               return {
                    ...state,
                    contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact)
               }
          case FILTER_CONTACTS:
               const regex = new RegExp(`${action.payload}`, 'gi')
               return {
                    ...state,
                    filtered: state.contacts.filter(
                         ({ name, email }) => regex.test(name) || regex.test(email)
                    )
               }
          case CLEAR_FILTER:
               return {
                    ...state,
                    filtered: null
               }
          case CONTACT_ERROR:
               return {
                    ...state,
                    error: action.payload
               }
          default:
               return state
     }
}