import { useOnEventOutside, UseOnEventOutsideOptions } from './useOnEventOutside';

export type UseOnScrollOutsideOptions = UseOnEventOutsideOptions<TouchEvent | WheelEvent>;

/**
 * Utility to perform checks where a wheel/scroll event was made outside a compoent
 */
export const useOnScrollOutside = (options: UseOnScrollOutsideOptions) => {
  useOnEventOutside<WheelEvent>({ ...options, event: 'wheel' });
  useOnEventOutside<TouchEvent>({ ...options, event: 'touchmove' });
};
