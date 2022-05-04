export const clampWhenInRange = (oldValue: number, newValue: number, min?: number, max?: number): number => {
  // When oldValue is in the range of [min, max] clamp newValue.
  // Don't clamp values outside this range so users get a
  // more natural behavior. For example, if the range is [5, 15]
  // and the user types 1 into the input we don't want to clamp
  // the value when they next press the increment button because
  // clamping would snap the value to 5 rather than increment to 2.
  let nextValue = newValue;
  if (min !== undefined && oldValue >= min) {
    if (max !== undefined && min > max) {
      const error = new Error();
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(
          [
            `"min" value "${min}" is greater than "max" value "${max}".`,
            '"min" must be less than or equal to "max".',
            `Returning value "${newValue}".`,
            error.stack,
          ].join(),
        );
      }
      return newValue;
    }

    nextValue = Math.max(min, nextValue);
  }

  if (max !== undefined && oldValue <= max) {
    nextValue = Math.min(max, nextValue);
  }

  return nextValue;
};
