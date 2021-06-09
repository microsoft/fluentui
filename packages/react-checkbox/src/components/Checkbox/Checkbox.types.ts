import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';

/**
 * Checkbox Props
 */
export interface CheckboxProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /*
   * TODO Add props and slots here
   * Any slot property should be listed in the checkboxShorthandProps array below
   * Any property that has a default value should be listed in CheckboxDefaultedProps as e.g. 'size' | 'icon'
   */
}

/**
 * Names of the shorthand properties in CheckboxProps
 */
export type CheckboxShorthandProps = never; // TODO add shorthand property names

/**
 * Names of CheckboxProps that have a default value in useCheckbox
 */
export type CheckboxDefaultedProps = never; // TODO add names of properties with default values

/**
 * State used in rendering Checkbox
 */
export interface CheckboxState extends ComponentState<CheckboxProps, CheckboxShorthandProps, CheckboxDefaultedProps> {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
}
