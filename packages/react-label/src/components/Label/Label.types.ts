import * as React from 'react';
import { ComponentProps, ComponentState, ShorthandProps } from '@fluentui/react-utilities';

/**
 * Label Props
 */
export interface LabelProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Whether the associated form field is required or not
   * @defaultvalue false
   */
  required?: boolean;

  /**
   * Whether the associated form field is required or not
   * @defaultvalue false
   */
  optional?: boolean;
  /**
   * Renders the label as disabled.
   * @defaultvalue false
   */
  disabled?: boolean;

  /**
   *
   */
  info?: ShorthandProps<ComponentProps>;
}

/**
 * Names of the shorthand properties in LabelProps
 */
export type LabelShorthandProps = 'info'; // TODO add shorthand property names

/**
 * Names of LabelProps that have a default value in useLabel
 */
export type LabelDefaultedProps = never; // TODO add names of properties with default values

/**
 * State used in rendering Label
 */
export interface LabelState extends ComponentState<LabelProps, LabelShorthandProps, LabelDefaultedProps> {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;

  /**
   * Show info
   */
  showInfo: boolean;
}
