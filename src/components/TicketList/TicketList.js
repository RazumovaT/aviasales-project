import React, { useEffect } from "react";
import styles from "../TicketList/TicketList.module.scss";
import { DotLoader } from "react-spinner-overlay";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import {
  fetchId,
  allTickets,
  fetchStatus,
  fetchStop,
  addSlice,
  searchId,
  fetchTicketsData,
} from "../../store/ticketsSlice.js";
import Ticket from "../Ticket/Ticket";
import { useSelector } from "react-redux";

const TicketList = () => {
  const id = useSelector(searchId);
  const tickets = useSelector(allTickets);
  const status = useSelector(fetchStatus);
  const stop = useSelector(fetchStop);
  const slice = useSelector(addSlice);
  const transfers = useSelector((state) => state.transfers.transfers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchId());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchTicketsData(id));
    }
  }, [dispatch, id, stop]);

  const filterTicketsByTransfers = (arr) => {
    let newArr = [];
    transfers.forEach((transfer) => {
      if (transfer.checked) {
        let stopsArr = arr.filter(
          (el) =>
            el.segments[0].stops.length === transfer.id ||
            el.segments[1].stops.length === transfer.id
        );
        newArr.push([...stopsArr]);
      }
    });
    return [...newArr].flat();
  };

  const content = filterTicketsByTransfers(tickets)
    .slice(0, slice)
    .map((ticket) => {
      return <Ticket ticket={ticket} key={nanoid()} />;
    });

  return (
    <>
      {status === "loading" && (
        <div className={styles.loader}>
          <DotLoader size={16} color="#2196f3" between={10} />
        </div>
      )}{" "}
      {transfers.every((transfer) => !transfer.checked) &&
        status === "resolved" && (
          <p className={styles.searchResult}>
            Sorry! No tickets have been found
          </p>
        )}
      {tickets && content}
    </>
  );
};

export { TicketList };
