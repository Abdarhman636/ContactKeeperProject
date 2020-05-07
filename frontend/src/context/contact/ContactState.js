import React, { useReducer } from 'react'
import uuid from 'uuid/v5'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import axios from 'axios'
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
import Axios from 'axios'

const ContactState = props => {
     const initialState = {
          contacts: [],
          current: null,
          filtered: null,
          error: null
     }

     const [state, dispatch] = useReducer(contactReducer, initialState)

     // add contact 
     const addContact = async contact => {
          const config ={
               headers: {
                    'Content-Type' : 'applictation/json'
               }
          }

          try {
               const res = await axios.post('/api/contacts', contact, config)
               dispatch({ 
                    type: ADD_CONTACT, 
                    payload: res.data })
          } catch (err) {
               dispatch({ 
                    type: CONTACT_ERROR,
                    payload: err.response.msg
               })
          }
          
     }

     // delet Contact 
     const deletContact = id => {
          dispatch({ type: DELET_CONTACT, payload: id })
     }

     // set current contact 
     const setCurrent = contact => {
          dispatch({ type: SET_CURRENT, payload: contact })
     }

     // clear current contact 
     const clearCurrent = () => {
          dispatch({ type: CLEAR_CURRENT })
     }

     // update contact 
     const udpateContact = contact => {
          dispatch({ type: UPDATE_CONTACT, payload: contact })
     }

     // filter contacts 
     const filterContacts = text => {
          dispatch({ type: FILTER_CONTACTS, payload: text })
     }

     // clear filter 
     const clearFilter = () => {
          dispatch({ type: CLEAR_FILTER })
     }


     return (
          <ContactContext.Provider value={{
               contacts: state.contacts,
               current: state.current,
               filtered: state.filtered,
               error: state.error,
               addContact,
               deletContact,
               setCurrent,
               clearCurrent,
               udpateContact,
               filterContacts,
               clearFilter,
          }}>
               {props.children}
          </ContactContext.Provider>
     )
}

export default ContactState