import React, { useContext } from 'react';
import ContactContext from '../../context/contact/contactContext'

const ContactItem = ({ contact }) => {
     const { id, name, email, phone, type } = contact
     const contactContext = useContext(ContactContext)
     const { deletContact, setCurrent, clearCurrent } = contactContext

     const onDelete = () => {
          deletContact(id)
          clearCurrent()
     }

     return (
          <div className='card bg-light'>
               <h3 className='text-primary text-left'>
                    {name}{'  '}  <span style={{ float: 'right' }}
                         className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>
                         {type.charAt(0).toUpperCase() + type.slice(1)} </span>
               </h3>
               <ul className='list'>
                    {email && (<li>
                         <i className='fas fa-envelope-open'> {email}</i>
                    </li>)}
                    {phone && (<li>
                         <i className='fas fa-phone'> {phone}</i>
                    </li>)}
               </ul>
               <p>
                    <button className='btn btn-dark btn-sm' onClick={() => setCurrent(contact)}>Edit</button>
                    <button className='btn btn-danger btn-sm' onClick={ onDelete }>Delete</button>
               </p>
          </div>
     );
}

export default ContactItem;