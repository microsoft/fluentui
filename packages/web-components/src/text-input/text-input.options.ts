import { ValuesOf } from '@microsoft/fast-foundation';

/**
 * TextInput size constants
 * @public
 */
export const TextInputSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

/**
 * The type for TextInputSize
 * @public
 */
export type TextInputSize = ValuesOf<typeof TextInputSize>;

/**
 * TextInput appearance Constants
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
 * Applies styling to TextInput
 * @public
 */
export type TextInputAppearance = ValuesOf<typeof TextInputAppearance>;

/**
 * TextInput layout Constants
 * @public
 */
export const TextInputLayout = {
  block: 'block',
  inline: 'inline',
} as const;

/**
 * Applies display style property
 * @public
 */
export type TextInputLayout = ValuesOf<typeof TextInputLayout>;
