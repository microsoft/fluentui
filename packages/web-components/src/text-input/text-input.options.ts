import type { ValuesOf } from '../utils/index.js';

/**
 * TextInput size constants
 * @public
 */
export const TextInputControlSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

/**
 * Applies size styling to TextInput
 * @public
 */
export type TextInputControlSize = ValuesOf<typeof TextInputControlSize>;

/**
 * TextInput appearance constants
 * @public
 */
export const TextInputAppearance = {
  outline: 'outline',
  underline: 'underline',
  filledLighter: 'filled-lighter',
  filledDarker: 'filled-darker',
} as const;

/**
 * Applies appearance styling to TextInput
 * @public
 */
export type TextInputAppearance = ValuesOf<typeof TextInputAppearance>;

/**
 * Text field sub-types
 * @public
 */
export const TextInputType = {
  /**
   * An email TextInput
   */
  email: 'email',

  /**
   * A password TextInput
   */
  password: 'password',

  /**
   * A telephone TextInput
   */
  tel: 'tel',

  /**
   * A text TextInput
   */
  text: 'text',

  /**
   * A URL TextInput
   */
  url: 'url',
} as const;

/**
 * Types for the text field sub-types
 * @public
 */
export type TextInputType = ValuesOf<typeof TextInputType>;
