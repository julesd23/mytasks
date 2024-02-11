import dayjs from 'dayjs';

const formatDate = (date: string | number | Date | dayjs.Dayjs | null | undefined) =>
  dayjs(date).format('DD/MM/YYYY');

export default formatDate;
