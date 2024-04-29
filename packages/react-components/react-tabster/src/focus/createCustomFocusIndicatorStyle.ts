import { defaultOptions, FOCUS_VISIBLE_ATTR, FOCUS_WITHIN_ATTR } from './constants';
import { makeResetStyles } from '@griffel/react';
import type { GriffelStyle } from '@griffel/react';

// TODO: Use the type directly from @griffel/react
// https://github.com/microsoft/griffel/pull/278
type GriffelResetStyle = Parameters<typeof makeResetStyles>[0];

export interface CreateCustomFocusIndicatorStyleOptions {
  /**
   * Control if the indicator appears when the corresponding element is focused,
   * or any child is focused within the corresponding element.
   * @default 'focus'
   * @alias selectorType
   */
  selector?: 'focus' | 'focus-within';
  /**
   * Customizes the selector provided based on the selector type.
   */
  customizeSelector?: (selector: string) => string;
  /**
   * Enables the browser default outline style
   * @deprecated The custom focus indicator no longer affects outline styles. Outline is overridden
   * in the default focus indicator function, `createFocusOutlineStyle`.
   */
  enableOutline?: boolean;
}

/**
 * Creates a style for @see makeStyles that includes the necessary selectors for focus.
 * Should be used only when @see createFocusOutlineStyle does not fit requirements
 *
 * If you're using `createCustomFocusIndicatorStyle` instead of `createFocusOutlineStyle`
 * keep in mind that the default outline style is not going to be removed
 * (as it is in `createFocusOutlineStyle`),
 * and is your responsibility to manually remove it from your styles.
 *
 * @example
 * ```ts
 * // Link styles
 * const useStyles = makeStyles({
  focusIndicator: createCustomFocusIndicatorStyle({
    textDecorationColor: tokens.colorStrokeFocus2,
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',
    outlineStyle: 'none',
  }),
  // Common styles.
  root: {
    // ❗️ DO NOT FORGET TO REMOVE THE DEFAULT OUTLINE STYLE
    ':focus-visible': {
      outlineStyle: 'none',
    },
 * ```
 *
 * @param style - styling applied on focus, defaults to @see getDefaultFocusOutlineStyles
 * @param options - Configure the style of the focus outline
 */
export function createCustomFocusIndicatorStyle<TStyle extends GriffelStyle | GriffelResetStyle>(
  style: TStyle,
  {
    selector: selectorType = defaultOptions.selector,
    customizeSelector = defaultOptions.customizeSelector,
  }: CreateCustomFocusIndicatorStyleOptions = defaultOptions,
): TStyle extends GriffelStyle ? GriffelStyle : GriffelResetStyle {
  return { [customizeSelector(createBaseSelector(selectorType))]: style };
}

function createBaseSelector(selectorType: 'focus' | 'focus-within'): string {
  switch (selectorType) {
    case 'focus':
      return `&[${FOCUS_VISIBLE_ATTR}]`;
    case 'focus-within':
      return `&[${FOCUS_WITHIN_ATTR}]:focus-within`;
  }
}
