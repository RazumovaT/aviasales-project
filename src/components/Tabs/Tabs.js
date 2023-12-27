import React from "react";
import { Radio } from "antd";
import styles from "./Tabs.module.scss";
import { useDispatch } from "react-redux";
import {
  filterCheapestFlight,
  filterFastestFlight,
  filterOptimalFlight,
} from "../../store/ticketsSlice";

const Tabs = () => {
  const dispatch = useDispatch();
  return (
    <Radio.Group
      defaultValue="optimal"
      buttonStyle="solid"
      className={styles.buttons}
    >
      <Radio.Button
        className={styles.button}
        onClick={() => dispatch(filterCheapestFlight())}
        value="cheap"
      >
        Самый дешевый
      </Radio.Button>
      <Radio.Button
        className={styles.button}
        onClick={() => dispatch(filterFastestFlight())}
        value="fast"
      >
        Самый быстрый
      </Radio.Button>
      <Radio.Button
        onClick={() => dispatch(filterOptimalFlight())}
        className={styles.button}
        value="optimal"
      >
        Оптимальный
      </Radio.Button>
    </Radio.Group>
  );
};

export { Tabs };
