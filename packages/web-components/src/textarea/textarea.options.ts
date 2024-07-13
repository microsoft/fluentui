import type { StartEndOptions } from '../patterns/start-end.js';
import type { ValuesOf } from '../utils/typings.js';
import type { TextArea } from './textarea.js';

/**
 * TextArea configuration options.
 *
 * @public
 */
export type TextAreaOptions = StartEndOptions<TextArea>;

/**
 * Values for the `control-size` attribute on TextArea elements.
 *
 * @public
 */
export const TextAreaControlSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export type TextAreaControlSize = ValuesOf<typeof TextAreaControlSize>;

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

export const TextAreaAppearancesForDisplayShadow: TextAreaAppearance[] = [
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
