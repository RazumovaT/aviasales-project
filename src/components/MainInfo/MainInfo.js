import React from "react";
import { useSelector } from "react-redux";
import { transferArray } from "../../store/transferSlice";
import styles from "./MainInfo.module.scss";
import { TicketList } from "../TicketList/TicketList";
import { Tabs } from "../Tabs/Tabs";
import { ShowMoreButton } from "../ShowMoreButton/ShowMoreButton";

const MainInfo = () => {
  const transfers = useSelector(transferArray);
  return (
    <div className={styles.main}>
      <Tabs />
      <TicketList />
      {transfers.some((el) => el.checked) && <ShowMoreButton />}
    </div>
  );
};

export { MainInfo };
