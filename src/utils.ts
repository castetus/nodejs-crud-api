import { validate } from 'uuid';

export const checkId = (id: string) => {
  return validate(id);
};