export const stringLiteralsArray = <T extends string>(...args: T[]): T[] => {
  const tuple = <T extends string>(...args: T[]) => args;
  return tuple(...args);
};
