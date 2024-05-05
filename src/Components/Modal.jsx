import React from 'react'

const Modal = () => {
    const formProps = [{
        title: 'Name',
        htmlFor: 'name',
        type: 'text',
      }, {
        title: 'Email',
        htmlFor: 'email',
        type: 'email',
      }, {
        title: 'Contact',
        htmlFor: 'contact',
        type: 'tel',
      }, {
        title: 'Message',
        htmlFor: 'message',
        type: 'textarea'
      },{
        title:'Flat, House no., Building',
        htmlFor:'Flat, House no., Building, Company, Apartment',
        type:'text'
      },{
        title:'Area, street, sector, village',
        htmlFor:'Area, street, sector, village',
        type:'text'
      },{
        title:'Landmark',
        htmlFor:'landmark',
        type:'text'
      }];
  return (
    <div>
      
    </div>
  )
}

export default Modal
