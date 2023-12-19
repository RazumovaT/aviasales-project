import { configureStore } from "@reduxjs/toolkit";
import ticketsSlice from "./ticketsSlice";
import transferSlice from "./transferSlice";

export default configureStore({
  reducer: {
    transfers: transferSlice,
    tickets: ticketsSlice,
  },
});
