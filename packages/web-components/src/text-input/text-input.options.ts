import { ValuesOf } from '@microsoft/fast-foundation';

/**
 * TextInput size constants
 * @public
 */
export const TextControlSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

/**
 * Applies size styling to TextInput
 * @public
 */
export type TextControlSize = ValuesOf<typeof TextControlSize>;

/**
 * TextInput appearance constants
 * @public
 */
export const TextInputAppearance = {
  outline: 'outline',
  underline: 'underline',
  filledLighter: 'filled-lighter',
  filledLighterShadow: 'filled-lighter--shadow',
  filledDarker: 'filled-darker',
  filledDarkerShadow: 'filled-darker--shadow',
} as const;

/**
 * Applies appearance styling to TextInput
 * @public
 */
export type TextInputAppearance = ValuesOf<typeof TextInputAppearance>;
