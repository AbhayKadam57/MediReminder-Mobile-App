import moment from "moment";

export const formatDate = (date) => {
  return new Date(date).setHours(0, 0, 0, 0);
};

export const formatDateText = (date) => {
  return moment(date).format("LL");
};

export const formatTime = (time) => {
  const date = new Date(time);

  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return timeString;
};

export const formatAddDateRange = (startDate, endDate) => {
  const start = moment(new Date(startDate), "MM/DD/YYYY");
  const end = moment(new Date(endDate), "MM/DD/YYYY");

  const dates = [];

  while (start.isSameOrBefore(end)) {
    dates.push(start.format("MM/DD/YYYY"));
    start.add(1, "days");
  }

  return dates;
};

export const GetDateRangeToDisplay = () => {
  const dateList = [];

  for (let i = 0; i < 7; i++) {
    dateList.push({
      date: moment().add(i, "days").format("DD"), //24
      day: moment().add(i, "days").format("dd"), //24
      formattedDate: moment().add(i, "days").format("L"),
    });
  }

  return dateList;
};

export const GetPreviousDateRangeToDisplay = () => {
  const dateList = [];

  for (let i = 0; i < 7; i++) {
    dateList.push({
      date: moment()
        .subtract(i + 1, "days")
        .format("DD"), //24
      day: moment()
        .subtract(i + 1, "days")
        .format("dd"), //24
      formattedDate: moment()
        .subtract(i + 1, "days")
        .format("L"),
    });
  }
  return dateList;
};
