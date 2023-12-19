import React from "react";
import logo from "/Users/razumova/aviasales-project/src/components/Logo/logo.svg";
// import logo from "src/components/Logo/Logo-plane.svg";

import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <div className={styles.wrapper}>
      <img src={logo} alt="logo-plane" className={styles.logo} />
    </div>
  );
};

export { Logo };
