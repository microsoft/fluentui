import type { ComponentProps, ComponentState, ElementShorthandProps } from '@fluentui/react-utilities';

export type InputSlots = {
  root: ElementShorthandProps<'span'>;
  /** The actual `<input>` element */
  input: ElementShorthandProps<'input'>;
  /**
   * Wrapper element containing `insideStart`, `input`, and `insideEnd`. This is the element that
   * visually appears to be the input and is used for borders, focus styling, etc.
   */
  inputWrapper: ElementShorthandProps<'span'>;
  /** Element before the input field, visually separated from it */
  bookendBefore?: ElementShorthandProps<'span'>;
  /** Element after the input field, visually separated from it */
  bookendAfter?: ElementShorthandProps<'span'>;
  /** Element at the start of the input field, visually appearing to be inside of it */
  insideStart?: ElementShorthandProps<'span'>;
  /** Element at the end of the input field, visually appearing to be inside of it */
  insideEnd?: ElementShorthandProps<'span'>;
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
