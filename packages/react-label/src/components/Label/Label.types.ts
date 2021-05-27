import * as React from 'react';
import { ComponentProps, ComponentState, ShorthandProps } from '@fluentui/react-utilities';

/**
 * Label Props
 * {@docCategory Label}
 */
export interface LabelProps extends ComponentProps, React.LabelHTMLAttributes<HTMLElement> {
  /**
   * Renders the label as disabled
   * @defaultvalue false
   */
  disabled?: boolean;

  /**
   * Whether the associated form field is required or not. If true it will be an asterisk,
   * otherwise it will be what is provided.
   * @defaultvalue false
   */
  required?: boolean | ShorthandProps<ComponentProps>;

  /**
   * The slot to display a popover with the label information
   */
  info?: ShorthandProps<ComponentProps>;

  size?: 'small' | 'medium' | 'large';

  strong?: boolean;
}

/**
 * Names of the shorthand properties in LabelProps
 * {@docCategory Label}
 */
export type LabelShorthandProps = 'info' | 'required';

/**
 * Names of LabelProps that have a default value in useLabel
 * {@docCategory Label}
 */
export type LabelDefaultedProps = 'size';

/**
 * State used in rendering Label
 * {@docCategory Label}
 */
export interface LabelState extends ComponentState<LabelProps, LabelShorthandProps, LabelDefaultedProps> {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
}
