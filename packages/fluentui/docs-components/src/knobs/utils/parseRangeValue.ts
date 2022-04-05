export const parseValue = (parseValue: number | string): number => {
  const stringified = parseValue.toString();
  const hasDecimal = /\.\d/.test(stringified);

  return hasDecimal ? parseFloat(stringified) : parseInt(stringified, 10);
};
