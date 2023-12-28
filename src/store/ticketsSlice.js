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

export const fetchTicketsData = createAsyncThunk(
  "tickets/fetchTicketData",
  async (searchId, { dispatch }) => {
    const arr = [];

    try {
      const response = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
      );
      if (response.ok) {
        const { tickets, stop } = await response.json();
        arr.push(...tickets);
        if (!stop) {
          arr.push(...dispatch(fetchTicketsData(searchId)));
        } else if (stop) {
          dispatch(stopFetching());
        }
      } else if (response.status === 500) {
        arr.push(...dispatch(fetchTicketsData(searchId)));
      }
    } catch {
      return arr;
    }
    return arr;
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
    cheapestFlights: false,
    fastestFlights: false,
    optimalFlights: true,
  },
  reducers: {
    addMoreTickets(state) {
      state.slice = state.slice + 5;
    },
    stopFetching(state) {
      state.status = "resolved";
    },
    setActiveTab(state, action) {
      switch (action.payload) {
        case "cheap":
          state.cheapestFlights = true;
          state.fastestFlights = false;
          state.optimalFlights = false;
          state.slice = 5;
          break;
        case "fast":
          state.cheapestFlights = false;
          state.fastestFlights = true;
          state.optimalFlights = false;
          state.slice = 5;
          break;
        case "optimal":
          state.cheapestFlights = false;
          state.fastestFlights = false;
          state.optimalFlights = true;
          state.slice = 5;
          break;
        default:
          state.cheapestFlights = false;
          state.fastestFlights = false;
          state.optimalFlights = true;
          state.slice = 5;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchId.fulfilled, (state, action) => {
      state.status = "resolved";
      state.error = null;
      state.searchId = action.payload.searchId;
    });
    builder.addCase(fetchTicketsData.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
    builder.addCase(fetchTicketsData.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchTicketsData.fulfilled, (state, action) => {
      state.error = null;

      state.tickets.push(...action.payload);
    });
  },
});

export const allTickets = (state) => state.tickets.tickets;
export const searchId = (state) => state.tickets.searchId;
export const fetchStatus = (state) => state.tickets.status;
export const addSlice = (state) => state.tickets.slice;
export const cheapestFlights = (state) => state.tickets.cheapestFlights;
export const fastestFlights = (state) => state.tickets.fastestFlights;
export const optimalFlights = (state) => state.tickets.optimalFlights;
export const { addMoreTickets, stopFetching, setActiveTab } =
  ticketsSlice.actions;
export default ticketsSlice.reducer;
