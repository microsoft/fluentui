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
export const TextFieldType = {
  /**
   * An email TextField
   */
  email: 'email',

  /**
   * A password TextField
   */
  password: 'password',

  /**
   * A telephone TextField
   */
  tel: 'tel',

  /**
   * A text TextField
   */
  text: 'text',

  /**
   * A URL TextField
   */
  url: 'url',
} as const;

/**
 * Types for the text field sub-types
 * @public
 */
export type TextFieldType = ValuesOf<typeof TextFieldType>;
