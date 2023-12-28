import React, { useEffect } from "react";
import styles from "../TicketList/TicketList.module.scss";
import { DotLoader } from "react-spinner-overlay";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import {
  fetchId,
  allTickets,
  fetchStatus,
  // fetchStop,
  addSlice,
  searchId,
  fetchTicketsData,
  cheapestFlights,
  fastestFlights,
  optimalFlights,
} from "../../store/ticketsSlice.js";
import { transferArray } from "../../store/transferSlice";
import Ticket from "../Ticket/Ticket";
import { useSelector } from "react-redux";

const TicketList = () => {
  const id = useSelector(searchId);
  const tickets = useSelector(allTickets);
  const status = useSelector(fetchStatus);
  // const stop = useSelector(fetchStop);
  const slice = useSelector(addSlice);
  const transfers = useSelector(transferArray);
  const cheapest = useSelector(cheapestFlights);
  const fastest = useSelector(fastestFlights);
  const optimal = useSelector(optimalFlights);

  const dispatch = useDispatch();

  const transfersCheck = transfers.some((el) => el.checked);

  useEffect(() => {
    dispatch(fetchId());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchTicketsData(id));
    }
  }, [dispatch, id]);

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

  const copiedArr = JSON.parse(JSON.stringify(tickets));

  const filterTicketsByTabs = (a, b) => {
    if (cheapest) {
      return a.price - b.price;
    } else if (fastest) {
      return (
        a.segments[0].duration +
        a.segments[1].duration -
        (b.segments[0].duration + b.segments[1].duration)
      );
    } else if (optimal) {
      return (
        a.price / (a.segments[0].duration + a.segments[1].duration) -
        b.price / (b.segments[0].duration + b.segments[1].duration)
      );
    }
  };

  const finalTicketsArray = [
    ...new Set(filterTicketsByTransfers(copiedArr).sort(filterTicketsByTabs)),
  ];

  const content = finalTicketsArray.slice(0, slice).map((ticket) => {
    return <Ticket ticket={ticket} key={nanoid()} />;
  });

  return (
    <>
      {status === "loading" && transfersCheck && (
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
