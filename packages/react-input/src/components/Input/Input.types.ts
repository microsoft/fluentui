import * as React from 'react';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';

export type InputSlots = {
  /** The actual `<input>` element */
  input: React.InputHTMLAttributes<HTMLInputElement>;
  /**
   * Wrapper element containing `insideStart`, `input`, and `insideEnd`. This is the element that
   * visually appears to be the input and is used for borders, focus styling, etc.
   */
  inputWrapper: React.HTMLAttributes<HTMLElement>;
  /** Element before the input field, visually separated from it */
  bookendBefore?: React.HTMLAttributes<HTMLElement>;
  /** Element after the input field, visually separated from it */
  bookendAfter?: React.HTMLAttributes<HTMLElement>;
  /** Element at the start of the input field, visually appearing to be inside of it */
  insideStart?: React.HTMLAttributes<HTMLElement>;
  /** Element at the end of the input field, visually appearing to be inside of it */
  insideEnd?: React.HTMLAttributes<HTMLElement>;
};

export interface InputCommons extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {}

/**
 * Input Props
 */
export interface InputProps extends ComponentProps<Partial<InputSlots>>, Partial<InputCommons> {}

/**
 * State used in rendering Input
 */
export interface InputState extends ComponentState<InputSlots>, InputCommons {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
}
