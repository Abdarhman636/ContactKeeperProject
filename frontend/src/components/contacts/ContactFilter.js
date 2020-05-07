import React, { useContext, useRef, useEffect  } from 'react'
import ContactContext from '../../context/contact/contactContext'


const ContactFilter = () => {

     const contactContext =  useContext(ContactContext)
     const { clearFilter , filterContacts, filtered } = contactContext
     const text = useRef('')

     const onChange = e => {
          if (text.current.value !== '' ) {
               filterContacts(e.target.value)
          } else {
               clearFilter()
          }
     }

     useEffect(() => {
          if( filtered === null ) {
               text.current.value = ''
          }
     })

     return (
          <form>
               <input ref={text} placeholder='Filter Contacts....' type='text' onChange={onChange}></input>
          </form>
     )
}

export default ContactFilter