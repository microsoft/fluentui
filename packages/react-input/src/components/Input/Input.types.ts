import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type InputSlots = {
  root: IntrinsicShorthandProps<'span'>;
  /** The actual `<input>` element */
  input: IntrinsicShorthandProps<'input'>;
  /**
   * Wrapper element containing `insideStart`, `input`, and `insideEnd`. This is the element that
   * visually appears to be the input and is used for borders, focus styling, etc.
   */
  inputWrapper: IntrinsicShorthandProps<'span'>;
  /** Element before the input field, visually separated from it */
  bookendBefore?: IntrinsicShorthandProps<'span'>;
  /** Element after the input field, visually separated from it */
  bookendAfter?: IntrinsicShorthandProps<'span'>;
  /** Element at the start of the input field, visually appearing to be inside of it */
  insideStart?: IntrinsicShorthandProps<'span'>;
  /** Element at the end of the input field, visually appearing to be inside of it */
  insideEnd?: IntrinsicShorthandProps<'span'>;
};

export interface InputCommons {
  /** @default 'medium' */
  // TODO this overlaps with a native input prop
  size?: 'small' | 'medium' | 'large';
  inline?: boolean;
  /** @default 'outline' */
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';
}

/**
 * Input Props
 */
export interface InputProps extends InputCommons, Omit<ComponentProps<Partial<InputSlots>>, 'children'> {}

/**
 * State used in rendering Input
 */
export interface InputState extends InputCommons, ComponentState<InputSlots> {}
