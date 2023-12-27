import React from "react";
import { Card } from "antd";
import styles from "./Ticket.module.scss";
import {
  countHours,
  countMinutes,
  countTransfersStops,
  convertDateIntoFlightTime,
  countEndOfFlightTime,
} from "../../features/features";

const Ticket = ({ ticket }) => {
  return (
    <Card className={styles.card}>
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
            )} –{" "}
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
            )} –{" "}
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
};

export default Ticket;
