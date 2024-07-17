import type { ValuesOf } from '../utils/typings.js';

/**
 * Values for the `size` attribute on TextArea elements.
 *
 * @public
 */
export const TextAreaSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export type TextAreaSize = ValuesOf<typeof TextAreaSize>;

/**
 * Values for the `appearance` attribute on TextArea elements.
 *
 * @public
 */
export const TextAreaAppearance = {
  outline: 'outline',
  filledLighter: 'filled-lighter',
  filledDarker: 'filled-darker',
} as const;

export type TextAreaAppearance = ValuesOf<typeof TextAreaAppearance>;

export const TextAreaAppearancesForDisplayShadow: Partial<TextAreaAppearance[]> = [
  TextAreaAppearance.filledLighter,
  TextAreaAppearance.filledDarker,
];

/**
 * Values for the `autocomplete` attribute on TextArea elements.
 *
 * @public
 */
export const TextAreaAutocomplete = {
  on: 'on',
  off: 'off',
} as const;

export type TextAreaAutocomplete = ValuesOf<typeof TextAreaAutocomplete>;

/**
 * Values for the `resize` attribute on TextArea elements.
 */
export const TextAreaResize = {
  none: 'none',
  both: 'both',
  horizontal: 'horizontal',
  vertical: 'vertical',
} as const;

export type TextAreaResize = ValuesOf<typeof TextAreaResize>;

export const TextAreaResizableResize: Partial<TextAreaResize[]> = [
  TextAreaResize.both,
  TextAreaResize.horizontal,
  TextAreaResize.vertical,
];

export const TextAreaVerticallyResizableResize: Partial<TextAreaResize[]> = [
  TextAreaResize.both,
  TextAreaResize.vertical,
];

export const TextAreaHorizontallyResizableResize: Partial<TextAreaResize[]> = [
  TextAreaResize.both,
  TextAreaResize.horizontal,
];
