import * as React from 'react';
import type { ComponentProps, ComponentState, ObjectShorthandProps } from '@fluentui/react-utilities';

export type InputSlots = {
  root: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  /** The actual `<input>` element */
  input: ObjectShorthandProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  /**
   * Wrapper element containing `insideStart`, `input`, and `insideEnd`. This is the element that
   * visually appears to be the input and is used for borders, focus styling, etc.
   */
  inputWrapper: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  /** Element before the input field, visually separated from it */
  bookendBefore?: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  /** Element after the input field, visually separated from it */
  bookendAfter?: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  /** Element at the start of the input field, visually appearing to be inside of it */
  insideStart?: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  /** Element at the end of the input field, visually appearing to be inside of it */
  insideEnd?: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
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
