import dayjs from 'dayjs';

interface Props {
  dt: string;
  format: string;
}

export const formatDate = ({ dt, format }: Props) => {
  let date = dayjs(dt);
  return date;
};
