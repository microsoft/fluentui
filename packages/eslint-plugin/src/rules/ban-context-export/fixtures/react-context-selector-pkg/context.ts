import type { Context } from './types';

export const createContext = <T>(value: T): Context<T> => {
  return {} as Context<T>;
};
