export const clampValue = (value?: number, max: number): number | undefined => {
  const internalValue = value !== undefined && value < 0 ? 0 : value !== undefined && value > max ? max : value;

  if (process.env.NODE_ENV !== 'production') {
    if (value !== undefined && value < 0) {
      // eslint-disable-next-line no-console
      console.error(`The prop 'value' must be greater than or equal to zero. Received value: ${value}`);
    }
    if (value && max && value > max) {
      // eslint-disable-next-line no-console
      console.error(`The prop 'value' must be less than or equal to 'max'. Received value: ${value}, max: ${max}`);
    }
  }
  return internalValue;
};
