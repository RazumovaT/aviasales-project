import React from "react";
import { Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styles from "./TransferBox.module.scss";
import { checked, checkedAll } from "../store/transferSlice.js";

const TransferBox = () => {
  const dispatch = useDispatch();
  const transfers = useSelector((state) => state.transfers.transfers);
  const transferAll = useSelector((state) => state.transfers.transferAll);

  const dispatchChange = (val) => {
    dispatch(checked(val));
  };

  const dispatchChangeAll = (checked) => {
    dispatch(checkedAll(checked));
  };

  return (
    <div className={styles.box}>
      <p className={styles.line}>Количество пересадок</p>
      {transferAll.map((item) => {
        return (
          <Checkbox
            key={item.id}
            value={item.name}
            onChange={(e) => dispatchChangeAll(e.target.checked)}
            checked={transfers.every((item) => item.checked)}
            className={styles.checkbox}
          >
            {item.name}
          </Checkbox>
        );
      })}
      {transfers.map((item) => {
        return (
          <Checkbox
            key={item.id}
            checked={item.checked}
            onChange={(e) => dispatchChange(e.target.value)}
            value={item.name}
            className={styles.checkbox}
          >
            {item.name}
          </Checkbox>
        );
      })}
    </div>
  );
};

export { TransferBox };
