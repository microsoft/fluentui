export const parseCSSLength = (value: string): number => {
  const parseResult = parseFloat(value);
  if (isNaN(parseResult)) {
    return 0;
  }

  return parseResult;
};
