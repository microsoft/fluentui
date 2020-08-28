export const toCompactArray = <T>(...values: T[]): T[] => {
  return ([] as T[]).concat(...values).filter(Boolean);
};
