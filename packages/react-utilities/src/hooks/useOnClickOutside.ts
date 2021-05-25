import { useOnEventOutside, UseOnEventOutsideOptions } from './useOnEventOutside';

export type UseOnClickOutsideOptions = UseOnEventOutsideOptions<MouseEvent | TouchEvent>;

/**
 * Utility to perform checks where a click/touch event was made outside a compoent
 */
export const useOnClickOutside = (options: UseOnClickOutsideOptions) => {
  useOnEventOutside<MouseEvent>({ ...options, event: 'click' });
  useOnEventOutside<MouseEvent>({ ...options, event: 'touchstart' });
};
