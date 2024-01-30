import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactItem from "./ContactItem";
import { getContacts } from "../store/ContactSlice";

const ContactList = () => {
  const contactsarr = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();
  console.log(contactsarr);
  useEffect(() => {
    dispatch(getContacts());
  }, []);
  return (
    <div className="contactList">
      {contactsarr.map((elem) => (
        <ContactItem key={elem.id} {...elem} />
      ))}
    </div>
  );
};

export default ContactList;
