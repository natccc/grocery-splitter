import {parse} from 'date-fns';

export const convertToISOString = (date: string): string => {
  const parsedDate = parse(date, 'dd/MM/yyyy HH:mm', new Date());
  parsedDate.setMilliseconds(0);
  return parsedDate.toISOString();
};

