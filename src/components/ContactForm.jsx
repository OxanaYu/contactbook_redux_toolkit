import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addContactAsync, getContacts } from "../store/ContactSlice";
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [img, setImg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!name.trim() || !lastName.trim() || !phone || !img) {
      return;
    }

    let newContact = {
      contName: name,
      contLastName: lastName,
      contPhone: phone,
      contImg: img,
    };
    dispatch(addContactAsync(newContact))
      .then(() => {
        setName("");
        setLastName("");
        setPhone("");
        setImg("");
      })
      .catch((error) => {
        console.error("Error adding contact:", error);
      });
    dispatch(getContacts());
    navigate("/");
  };

  //   useEffect(() => {
  //     dispatch(getContacts());
  //   }, [dispatch]);

  return (
    <div>
      <TextField
        value={name}
        id="outlined-basic"
        label="Name"
        variant="outlined"
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        value={lastName}
        id="outlined-basic"
        label="Last name"
        variant="outlined"
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        value={phone}
        id="outlined-basic"
        label="Phone number"
        variant="outlined"
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        value={img}
        id="outlined-basic"
        label="Img"
        variant="outlined"
        onChange={(e) => setImg(e.target.value)}
      />
      <Button onClick={handleClick} variant="contained">
        Add Contact
      </Button>
    </div>
  );
};

export default ContactForm;
