import { FOCUS_VISIBLE_CLASS, defaultOptions, FOCUS_WITHIN_CLASS } from './constants';
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
  ':focus': {
    outlineStyle: 'none',
  },
  ':focus-visible': {
    outlineStyle: 'none',
  },
  // Remove the `.fui-FluentProvider` global selector once Griffel supports chained global styles
  // https://github.com/microsoft/griffel/issues/178
  ...(selector === 'focus' && {
    [`:global(.fui-FluentProvider)`]: {
      [`& .${FOCUS_VISIBLE_CLASS}`]: style,
    },
  }),
  ...(selector === 'focus-within' && {
    [`:global(.fui-FluentProvider)`]: {
      [`& .${FOCUS_WITHIN_CLASS}:${selector}`]: style,
    },
  }),
});
