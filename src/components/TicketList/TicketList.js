import React, { useEffect } from "react";
import { DotLoader } from "react-spinner-overlay";
import { Card } from "antd";
import styles from "./TicketList.module.scss";
import { useDispatch } from "react-redux";
import { format, add } from "date-fns";
import { nanoid } from "@reduxjs/toolkit";
import {
  fetchId,
  fetchTicketsWithId,
  allTickets,
  fetchStatus,
  fetchStop,
  addSlice,
  searchId,
} from "../store/ticketsSlice.js";
import { useSelector } from "react-redux";

const TicketList = () => {
  const id = useSelector(searchId);
  const tickets = useSelector(allTickets);
  const status = useSelector(fetchStatus);
  const stop = useSelector(fetchStop);
  const slice = useSelector(addSlice);
  const transfers = useSelector((state) => state.transfers.transfers);
  const transferAll = useSelector((state) => state.transfers.transferAll);

  const dispatch = useDispatch();

  const countHours = (time) => {
    return Math.floor(time / 60);
  };

  const countMinutes = (time) => {
    const minutes = time - Math.floor(time / 60) * 60;
    return minutes < 10 ? "0" + minutes : minutes;
    // return time - Math.floor(time / 60) * 60;
  };

  const countTransfersStops = (transfer) => {
    if (transfer.length === 0) {
      return "Прямой рейс";
    } else if (transfer.length === 1) {
      return "1 пересадка";
    } else if (transfer.length === 2) {
      return "2 пересадки";
    } else {
      return "3 пересадки";
    }
  };

  const convertDateIntoFlightTime = (date) => {
    return format(new Date(date), "HH:mm");
  };

  const countEndOfFlightTime = (date, duration) => {
    return add(new Date(date), {
      minutes: duration,
    });
  };

  useEffect(() => {
    dispatch(fetchId());
  }, [dispatch]);

  useEffect(() => {
    if (id && !stop) {
      dispatch(fetchTicketsWithId(id));
    }
  }, [dispatch, stop, id]);

  const filterTicketsByTransfers = (arr) => {
    let newArr = [];
    if (transferAll[0].checked) return arr;
    else
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
      return (
        <Card className={styles.card} key={nanoid()}>
          <div className={styles.title}>
            <span>{ticket.price}</span>
            <img
              src={`https://pics.avs.io/99/36/${ticket.carrier}.png`}
              alt="logo"
            />
          </div>
          <div className={styles.details}>
            <div className={styles.request}>
              <span className={styles.countries}>
                {ticket.segments[0].origin} – {ticket.segments[0].destination}
              </span>
              <span className={styles.duration}>В пути</span>
              <span className={styles.transfers}>
                {countTransfersStops(ticket.segments[0].stops)}
              </span>
            </div>
            <div className={styles.info}>
              <span className={styles.schedule}>
                {" "}
                {convertDateIntoFlightTime(
                  ticket.segments[0].date.slice(0, -1)
                )}{" "}
                –{" "}
                {convertDateIntoFlightTime(
                  countEndOfFlightTime(
                    ticket.segments[0].date.slice(0, -1),
                    ticket.segments[0].duration
                  )
                )}
              </span>
              <span className={styles.time}>
                {countHours(ticket.segments[0].duration)}Ч{" "}
                {countMinutes(ticket.segments[0].duration)}М
              </span>
              <span className={styles.countryTransfer}>
                {ticket.segments[0].stops.join(", ")}
              </span>
            </div>
            <div className={styles.request}>
              <span className={styles.countries}>
                {" "}
                {ticket.segments[1].origin} – {ticket.segments[1].destination}
              </span>
              <span className={styles.duration}>В пути</span>
              <span className={styles.transfers}>
                {countTransfersStops(ticket.segments[1].stops)}
              </span>
            </div>
            <div className={styles.info}>
              <span className={styles.schedule}>
                {" "}
                {convertDateIntoFlightTime(
                  ticket.segments[1].date.slice(0, -1)
                )}{" "}
                –{" "}
                {convertDateIntoFlightTime(
                  countEndOfFlightTime(
                    ticket.segments[1].date.slice(0, -1),
                    ticket.segments[1].duration
                  )
                )}
              </span>
              <span className={styles.time}>
                {countHours(ticket.segments[1].duration)}Ч{" "}
                {countMinutes(ticket.segments[1].duration)}М
              </span>
              <span className={styles.countryTransfer}>
                {ticket.segments[1].stops.join(", ")}
              </span>
            </div>
          </div>
        </Card>
      );
    });

  return (
    <>
      {status === "loading" && (
        <div
          style={{
            marginLeft: "70px",
            margin: "30px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
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
