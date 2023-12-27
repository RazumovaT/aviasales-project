import React from "react";
import { Button } from "antd";
import styles from "./ShowMoreButton.module.scss";
import { addMoreTickets } from "../../store/ticketsSlice";
import { useDispatch } from "react-redux";

const ShowMoreButton = () => {
  const dispatch = useDispatch();
  return (
    <Button
      className={styles.button}
      onClick={() => dispatch(addMoreTickets())}
    >
      Показать еще 5 билетов!
    </Button>
  );
};

export { ShowMoreButton };
