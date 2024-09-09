export const clampMax = (max: number): number => {
  const internalMax = max <= 0 ? 1 : max;

  if (process.env.NODE_ENV !== 'production') {
    if (max <= 0) {
      // eslint-disable-next-line no-console
      console.error(`The prop 'max' must be greater than 0. Received max: ${max}`);
    }
  }
  return internalMax;
};
