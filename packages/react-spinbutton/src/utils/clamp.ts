export const clampWhenInRange = (oldValue: number, newValue: number, min?: number, max?: number): number => {
  // When oldvalue is in the range of [min, max] clamp newValue.
  // Don't clamp values outside this range so users get a
  // more natural behavior. For example, if the range is [5, 15]
  // and the user types 1 into the input we don't want to clamp
  // the value when they next press the increment button because
  // clamping would snap the value to 5 rather than increment to 2.
  let nextValue = newValue;
  if (min !== undefined && oldValue >= min) {
    nextValue = Math.max(min, nextValue);
  }

  if (max !== undefined && oldValue <= max) {
    nextValue = Math.min(max, nextValue);
  }

  return nextValue;
};
