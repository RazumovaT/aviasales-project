import { createSlice } from "@reduxjs/toolkit";

const transferSlice = createSlice({
  name: "transfers",
  initialState: {
    transferAll: [{ id: 1, name: "Все", checked: false }],
    transfers: [
      { id: 0, name: "Без пересадок", checked: false },
      { id: 1, name: "1 пересадка", checked: false },
      { id: 2, name: "2 пересадки", checked: false },
      { id: 3, name: "3 пересадки", checked: false },
    ],
  },
  reducers: {
    checked(state, action) {
      state.transfers = state.transfers.map((el) => {
        if (el.name === action.payload) {
          el.checked = !el.checked;
        }
        return el;
      });
    },
    checkedAll(state, action) {
      if (action.payload) {
        state.transfers = state.transfers.map((el) => {
          el.checked = true;
          return el;
        });
        state.transferAll = state.transferAll.map((el) => {
          el.checked = true;
          return el;
        });
      } else if (!action.payload) {
        state.transfers = state.transfers.map((el) => {
          el.checked = false;
          return el;
        });
        state.transferAll = state.transferAll.map((el) => {
          el.checked = false;
          return el;
        });
      }
    },
  },
});

export const { checked, checkedAll } = transferSlice.actions;
export default transferSlice.reducer;
