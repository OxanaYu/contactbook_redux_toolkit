import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../helpers/const";

export const getContacts = createAsyncThunk(
  "contacts/getContacts",
  async () => {
    const res = await axios(API);
    return res.data;
  }
);

export const addContactAsync = createAsyncThunk(
  "contacts/addContactAsync",
  async (newContact) => {
    const res = await axios.post(API, newContact);
    return res.data;
  }
);

export const deleteContactAsync = createAsyncThunk(
  "contacts/deleteContactAsync",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API}/${id}`);
      dispatch(deleteContact({ id }));

      return res.data;
    } catch (error) {
      console.log("Error deleting contact:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const editContactAsync = createAsyncThunk(
  "contacts/editContactAsync",
  async ({ id, updatedContact }) => {
    try {
      const res = await axios.patch(`${API}/${id}`, updatedContact);
      return res.data;
    } catch (error) {
      console.log("Error editing contact:", error);
      throw error;
    }
  }
);

const contactSlice = createSlice({
  name: "mycontacts",
  initialState: {
    contacts: [],
    status: null,
    error: null,
  },

  reducers: {
    addContact(state, action) {
      state.contacts.push(action.payload.newContact);
    },
    deleteContact(state, action) {
      state.contacts = state.contacts.filter(
        (elem) => elem.id !== action.payload.id
      );
    },
    editContact(state, action) {
      const { id, updatedContact } = action.payload;
      const editedContact = state.contacts.find((elem) => elem.id == id);
      editedContact = updatedContact;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.pending, (state, action) => {
        state.status = "загрузка контактов";
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.status = "контакты успешно загружены";
        state.contacts = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.status = "ошибка при загрузке контента";
        state.error = action.error;
      })
      .addCase(addContactAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addContactAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.contacts.push(action.payload);
      })
      .addCase(deleteContactAsync.pending, (state) => {
        state.status = "удаление контакта";
      })
      .addCase(deleteContactAsync.fulfilled, (state, action) => {
        state.status = "контакт успешно удален";
        // Удаляем контакт из состояния Redux после успешного удаления на сервере
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload.id
        );
      });
  },
});

export const { addContact, deleteContact, editContact } = contactSlice.actions;
export default contactSlice.reducer;
