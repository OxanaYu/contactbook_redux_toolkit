import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteContactAsync,
  editContactAsync,
  getContacts,
} from "../store/ContactSlice";

const ContactItem = ({ id, contName, contLastName, contPhone, contImg }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContact, setUpdatedContact] = useState({
    contName,
    contLastName,
    contPhone,
    contImg,
  });

  const navigate = useNavigate();

  const handleEdit = async () => {
    try {
      await dispatch(editContactAsync({ id, updatedContact }));
      setIsEditing(false);
      await dispatch(getContacts());
    } catch (error) {
      console.error("Error editing contact:", error);
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteContactAsync(id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
    dispatch(getContacts());
  };

  const handleDetails = () => {
    navigate("/details/id");
  };

  return (
    <div className="contact_card">
      <h3>{contName}</h3>
      <h3>{contLastName}</h3>
      <h4>{contPhone}</h4>
      <img src={contImg} alt="" />

      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedContact.contName}
            onChange={(e) =>
              setUpdatedContact({ ...updatedContact, contName: e.target.value })
            }
          />
          <input
            type="text"
            value={updatedContact.contLastName}
            onChange={(e) =>
              setUpdatedContact({
                ...updatedContact,
                contLastName: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={updatedContact.contPhone}
            onChange={(e) =>
              setUpdatedContact({
                ...updatedContact,
                contPhone: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={updatedContact.contImg}
            onChange={(e) =>
              setUpdatedContact({ ...updatedContact, contImg: e.target.value })
            }
          />
          <Button variant="contained" onClick={handleEdit}>
            Save
          </Button>
          <Button variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </>
      ) : (
        <>
          <Button variant="contained" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
          <Button variant="contained" onClick={handleDelete}>
            Delete
          </Button>
          <Link to={`/details/${id}`}>
            <Button variant="contained">Details</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default ContactItem;
