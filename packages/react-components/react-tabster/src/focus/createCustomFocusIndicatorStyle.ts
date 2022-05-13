import { KEYBOARD_NAV_SELECTOR, defaultOptions } from './constants';
import type { GriffelStyle } from '@griffel/react';

export interface CreateCustomFocusIndicatorStyleOptions {
  selector?: 'focus' | 'focus-within';
}

/**
 * Creates a style for @see makeStyles that includes the necessary selectors for focus.
 * Should be used only when @see createFocusOutlineStyle does not fit requirements
 *
 * @param style - styling applied on focus, defaults to @see getDefaultFocusOutlineStyes
 * @param options - Configure the style of the focus outline
 */
export const createCustomFocusIndicatorStyle = (
  style: GriffelStyle,
  { selector = defaultOptions.selector }: CreateCustomFocusIndicatorStyleOptions = defaultOptions,
): GriffelStyle => ({
  ':focus-visible': {
    outlineStyle: 'none',
  },
  [`${KEYBOARD_NAV_SELECTOR} :${selector}`]: style,
});
