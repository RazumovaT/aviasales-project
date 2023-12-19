import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchId = createAsyncThunk("tickets/fetchId", async function () {
  try {
    const data = await fetch(`https://aviasales-test-api.kata.academy/search`);

    const result = await data.json();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const fetchTicketsWithId = createAsyncThunk(
  "tickets/fetchTicketsWithId",
  async function (searchId) {
    try {
      const data = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
      );
      if (data.status === 500) {
        await fetch(
          `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
        );
      }
      const result = await data.json();
      return result;
    } catch (error) {
      if (error.code === "ERR_BAD_RESPONSE" || error.code === "ERR_ABORTED") {
        await fetch(
          `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
        );
      }
      throw new Error(error);
    }
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    status: "",
    error: null,
    searchId: null,
    tickets: [],
    stop: null,
    slice: 5,
  },
  reducers: {
    addMoreTickets(state) {
      state.slice = state.slice + 5;
    },
    filterCheapestFlight(state) {
      state.tickets = state.tickets.sort((a, b) => a.price - b.price);
      state.slice = 5;
    },
    filterFastestFlight(state) {
      state.tickets = state.tickets.sort(
        (a, b) =>
          a.segments[0].duration +
          a.segments[1].duration -
          (b.segments[0].duration + b.segments[1].duration)
      );
      state.slice = 5;
    },
    filterOptimalFlight(state) {
      state.tickets = state.tickets.sort(
        (a, b) =>
          a.price / (a.segments[0].duration + a.segments[1].duration) -
          b.price / (b.segments[0].duration + b.segments[1].duration)
      );
      state.slice = 5;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchId.fulfilled, (state, action) => {
      state.status = "resolved";
      state.error = null;
      state.searchId = action.payload.searchId;
    });
    builder.addCase(fetchTicketsWithId.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
    builder.addCase(fetchTicketsWithId.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchTicketsWithId.fulfilled, (state, action) => {
      state.status = "resolved";
      state.error = null;
      if (state.searchId) {
        const { stop, tickets } = action.payload;
        state.stop = stop;

        tickets.map((ticket) => state.tickets.push(ticket));
      }
    });
  },
});

export const allTickets = (state) => state.tickets.tickets;
export const searchId = (state) => state.tickets.searchId;
export const fetchStop = (state) => state.tickets.stop;
export const fetchStatus = (state) => state.tickets.status;
export const fetchError = (state) => state.tickets.error;
export const addSlice = (state) => state.tickets.slice;
export const {
  addMoreTickets,
  filterCheapestFlight,
  filterFastestFlight,
  filterOptimalFlight,
} = ticketsSlice.actions;
export default ticketsSlice.reducer;
