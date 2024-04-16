export const clampValue = (value: number | undefined, max: number): number | undefined => {
  if (value === undefined) {
    return value;
  }
  const internalValue = value < 0 ? 0 : value > max ? max : value;

  if (process.env.NODE_ENV !== 'production') {
    if (value < 0) {
      // eslint-disable-next-line no-console
      console.error(`The prop 'value' must be greater than or equal to zero. Received value: ${value}`);
    }
    if (value > max) {
      // eslint-disable-next-line no-console
      console.error(`The prop 'value' must be less than or equal to 'max'. Received value: ${value}, max: ${max}`);
    }
  }
  return internalValue;
};
