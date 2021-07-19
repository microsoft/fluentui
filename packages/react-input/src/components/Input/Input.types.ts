import * as React from 'react';
import { ComponentPropsCompat, ComponentStateCompat } from '@fluentui/react-utilities';

/**
 * Input Props
 */
export interface InputProps extends ComponentPropsCompat, React.HTMLAttributes<HTMLElement> {
  /*
   * TODO Add props and slots here
   * Any slot property should be listed in the inputShorthandProps array below
   * Any property that has a default value should be listed in InputDefaultedProps as e.g. 'size' | 'icon'
   */
}

/**
 * Names of the shorthand properties in InputProps
 */
export type InputShorthandProps = never; // TODO add shorthand property names

/**
 * Names of InputProps that have a default value in useInput
 */
export type InputDefaultedProps = never; // TODO add names of properties with default values

/**
 * State used in rendering Input
 */
export interface InputState extends ComponentStateCompat<InputProps, InputShorthandProps, InputDefaultedProps> {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
}
