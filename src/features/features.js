import { format, add } from "date-fns";


export const countHours = (time) => {
  return Math.floor(time / 60);
};

export const countMinutes = (time) => {
  const minutes = time - Math.floor(time / 60) * 60;
  return minutes < 10 ? "0" + minutes : minutes;
};

export const countTransfersStops = (transfer) => {
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

export const convertDateIntoFlightTime = (date) => {
  return format(new Date(date), "HH:mm");
};

export const countEndOfFlightTime = (date, duration) => {
  return add(new Date(date), {
    minutes: duration,
  });
};

