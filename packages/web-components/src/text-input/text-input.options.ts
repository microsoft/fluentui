import { ValuesOf } from '@microsoft/fast-foundation';

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
