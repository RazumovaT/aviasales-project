import { createSlice } from "@reduxjs/toolkit";

const transferSlice = createSlice({
  name: "transfers",
  initialState: {
    transferAll: [{ id: 1, name: "Все", checked: true }],
    transfers: [
      { id: 0, name: "Без пересадок", checked: true },
      { id: 1, name: "1 пересадка", checked: true },
      { id: 2, name: "2 пересадки", checked: true },
      { id: 3, name: "3 пересадки", checked: true },
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
export const transferArray = (state) => state.transfers.transfers;
export default transferSlice.reducer;
