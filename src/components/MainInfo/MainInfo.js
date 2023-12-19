import React from "react";
import styles from "./MainInfo.module.scss";
import { TicketList } from "../TicketList/TicketList";
import { Tabs } from "../Tabs/Tabs";
import { ShowMoreButton } from "../ShowMoreButton/ShowMoreButton";

const MainInfo = () => {
  return (
    <div className={styles.main}>
      <Tabs />
      <TicketList />
      <ShowMoreButton />
    </div>
  );
};

export { MainInfo };
