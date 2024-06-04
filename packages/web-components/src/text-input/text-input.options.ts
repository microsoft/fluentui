import type { StartEndOptions } from '../patterns/start-end.js';
import type { ValuesOf } from '../utils/typings.js';
import type { TextInput } from './text-input.js';

/**
 * TextInput configuration options.
 *
 * @public
 */
export type TextInputOptions = StartEndOptions<TextInput>;

/**
 * Values for the `control-size` attribute on TextInput elements.
 *
 * @public
 */
export const TextInputControlSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export type TextInputControlSize = ValuesOf<typeof TextInputControlSize>;

/**
 * Values for the `appearance` attribute on TextInput elements.
 *
 * @public
 */
export const TextInputAppearance = {
  outline: 'outline',
  underline: 'underline',
  filledLighter: 'filled-lighter',
  filledDarker: 'filled-darker',
} as const;

export type TextInputAppearance = ValuesOf<typeof TextInputAppearance>;

/**
 * Values for the `type` attribute on TextInput elements.
 *
 * @public
 */
export const TextInputType = {
  email: 'email',
  password: 'password',
  tel: 'tel',
  text: 'text',
  url: 'url',
} as const;

export type TextInputType = ValuesOf<typeof TextInputType>;

/**
 * Input types that block implicit form submission.
 *
 * @public
 */
export const ImplicitSubmissionBlockingTypes = [
  'date',
  'datetime-local',
  'email',
  'month',
  'number',
  'password',
  'search',
  'tel',
  'text',
  'time',
  'url',
  'week',
];
