import { defaultOptions, FOCUS_VISIBLE_ATTR, FOCUS_WITHIN_ATTR } from './constants';
import { makeResetStyles } from '@griffel/react';
import type { GriffelStyle } from '@griffel/react';

// TODO: Use the type directly from @griffel/react
// https://github.com/microsoft/griffel/pull/278
type GriffelResetStyle = Parameters<typeof makeResetStyles>[0];

export interface CreateCustomFocusIndicatorStyleOptions {
  selector?: 'focus' | 'focus-within';
  /**
   * Enables the browser default outline style
   * @default false
   */
  enableOutline?: boolean;
}

/**
 * Creates a style for @see makeStyles that includes the necessary selectors for focus.
 * Should be used only when @see createFocusOutlineStyle does not fit requirements
 *
 * @param style - styling applied on focus, defaults to @see getDefaultFocusOutlineStyles
 * @param options - Configure the style of the focus outline
 */
export function createCustomFocusIndicatorStyle<TStyle extends GriffelStyle | GriffelResetStyle>(
  style: TStyle,
  {
    selector = defaultOptions.selector,
    enableOutline = false,
  }: CreateCustomFocusIndicatorStyleOptions = defaultOptions,
): TStyle extends GriffelStyle ? GriffelStyle : GriffelResetStyle {
  return {
    ':focus': {
      outlineStyle: enableOutline ? undefined : 'none',
    },
    ':focus-visible': {
      outlineStyle: enableOutline ? undefined : 'none',
    },

    ...(selector === 'focus' && {
      [`&[${FOCUS_VISIBLE_ATTR}]`]: style,
    }),
    ...(selector === 'focus-within' && {
      [`&[${FOCUS_WITHIN_ATTR}]:${selector}`]: style,
    }),
  };
}
