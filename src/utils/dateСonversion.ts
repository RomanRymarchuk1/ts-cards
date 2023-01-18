import moment from "moment";

const dateConvesion = (date: string): string => {
   return moment(date).format("MMMM Do, YYYY");
};

export default dateConvesion;
