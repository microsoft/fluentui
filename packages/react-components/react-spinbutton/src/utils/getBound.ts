import type { SpinButtonBounds } from '../SpinButton';

export const getBound = (value: number, min?: number, max?: number): SpinButtonBounds => {
  if (min !== undefined && value === min) {
    if (max === min) {
      return 'both';
    }
    return 'min';
  } else if (max !== undefined && value === max) {
    return 'max';
  }

  return 'none';
};
