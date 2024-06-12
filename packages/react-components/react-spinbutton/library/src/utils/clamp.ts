export const clamp = (value: number, min?: number, max?: number): number => {
  let nextValue = value;
  if (min !== undefined) {
    if (max !== undefined && min > max) {
      const error = new Error();
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(
          [
            `"min" value "${min}" is greater than "max" value "${max}".`,
            '"min" must be less than or equal to "max".',
            `Returning value "${value}".`,
            error.stack,
          ].join(),
        );
      }
      return value;
    }

    nextValue = Math.max(min, nextValue);
  }

  if (max !== undefined) {
    nextValue = Math.min(max, nextValue);
  }

  return nextValue;
};
