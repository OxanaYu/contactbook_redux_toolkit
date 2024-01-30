import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../store/ContactSlice";

const ContactDetails = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContacts());
  }, []);

  const { id } = useParams();

  const contact = useSelector((state) =>
    state.contacts.contacts.find((contact) => contact.id === parseInt(id))
  );

  if (!contact) {
    return <div>Contact not found</div>;
  }
  console.log(contact);

  return (
    <div className="contact_card">
      <h2>Contact Details</h2>
      <h3>Name: {contact.contName}</h3>
      <h3>Last Name: {contact.contLastName}</h3>
      <h4>Phone: {contact.contPhone}</h4>
      <img src={contact.contImg} alt="" />
    </div>
  );
};

export default ContactDetails;
