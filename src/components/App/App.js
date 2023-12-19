import React from "react";
import styles from "./App.module.scss";
import { Logo } from "../Logo/Logo";
import { MainInfo } from "../MainInfo/MainInfo";
import { TransferBox } from "../TransferBox/TransferBox";


const App = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <Logo />
        <div className={styles.main}>
          <TransferBox />
          <MainInfo />
        </div>
      </div>
    </>
  );
};

export { App };
