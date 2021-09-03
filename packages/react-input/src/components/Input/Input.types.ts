import type { ComponentProps, ComponentState, ObjectShorthandPropsAs } from '@fluentui/react-utilities';

export type InputSlots = {
  root: ObjectShorthandPropsAs<'span'>;
  /** The actual `<input>` element */
  input: ObjectShorthandPropsAs<'input'>;
  /**
   * Wrapper element containing `insideStart`, `input`, and `insideEnd`. This is the element that
   * visually appears to be the input and is used for borders, focus styling, etc.
   */
  inputWrapper: ObjectShorthandPropsAs<'span'>;
  /** Element before the input field, visually separated from it */
  bookendBefore?: ObjectShorthandPropsAs<'span'>;
  /** Element after the input field, visually separated from it */
  bookendAfter?: ObjectShorthandPropsAs<'span'>;
  /** Element at the start of the input field, visually appearing to be inside of it */
  insideStart?: ObjectShorthandPropsAs<'span'>;
  /** Element at the end of the input field, visually appearing to be inside of it */
  insideEnd?: ObjectShorthandPropsAs<'span'>;
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
