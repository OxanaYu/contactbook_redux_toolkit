import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./ContactSlice";

export default configureStore({
  reducer: {
    contacts: contactReducer,
  },
});
