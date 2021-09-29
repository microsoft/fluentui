import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type InputSlots = {
  root: IntrinsicShorthandProps<'span'>;

  /** The actual `<input>` element. `type="text"` will be automatically applied unless overridden. */
  input: IntrinsicShorthandProps<'input'>;

  /**
   * Wrapper element containing `insideBefore`, `input`, and `insideAfter`. This is the element that
   * visually appears to be the input and is used for borders, focus styling, etc.
   */
  inputWrapper: IntrinsicShorthandProps<'span'>;

  /** Element before the input field, visually separated from it */
  bookendBefore?: IntrinsicShorthandProps<'span'>;

  /** Element after the input field, visually separated from it */
  bookendAfter?: IntrinsicShorthandProps<'span'>;

  /** Element at the start of the input field, visually appearing to be inside of it */
  insideBefore?: IntrinsicShorthandProps<'span'>;

  /** Element at the end of the input field, visually appearing to be inside of it */
  insideAfter?: IntrinsicShorthandProps<'span'>;
};

export type InputCommons = {
  /**
   * Size of the input (changes the font size and spacing).
   * @default 'medium'
   */
  // NOTE: can't use `size` as the name due to overlap with a native input prop :(
  fieldSize?: 'small' | 'medium' | 'large';

  /**
   * If true, the field will have inline display, allowing it be used within text content.
   * If false (the default), the field will have block display.
   */
  inline?: boolean;

  /**
   * Controls the colors and borders of the field.
   * @default 'outline'
   */
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';

  /**
   * Controls the colors and borders of the bookends.
   * @default 'filled'
   */
  bookendAppearance?: 'filled' | 'brand' | 'transparent';
};

/**
 * Input Props
 */
export type InputProps = InputCommons & Omit<ComponentProps<InputSlots>, 'children'>;

/**
 * State used in rendering Input
 */
export type InputState = InputCommons & ComponentState<InputSlots>;
