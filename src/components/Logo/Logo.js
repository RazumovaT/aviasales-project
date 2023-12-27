import React from "react";
import logo from "../../img/logo.svg";
import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <div className={styles.wrapper}>
      <img src={logo} alt="logo-plane" className={styles.logo} />
    </div>
  );
};

export { Logo };
