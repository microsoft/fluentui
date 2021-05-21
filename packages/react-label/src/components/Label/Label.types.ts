import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';

/**
 * Label Props
 */
export interface LabelProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /*
   * TODO Add props and slots here
   * Any slot property should be listed in the labelShorthandProps array below
   * Any property that has a default value should be listed in LabelDefaultedProps as e.g. 'size' | 'icon'
   */
}

/**
 * Names of the shorthand properties in LabelProps
 */
export type LabelShorthandProps = never; // TODO add shorthand property names

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
}
