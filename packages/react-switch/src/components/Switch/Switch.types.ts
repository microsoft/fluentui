import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';

/**
 * Switch Props
 */
export interface SwitchProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /*
   * TODO Add props and slots here
   * Any slot property should be listed in the switchShorthandProps array below
   * Any property that has a default value should be listed in SwitchDefaultedProps as e.g. 'size' | 'icon'
   */
}

/**
 * Names of the shorthand properties in SwitchProps
 */
export type SwitchShorthandProps = never; // TODO add shorthand property names

/**
 * Names of SwitchProps that have a default value in useSwitch
 */
export type SwitchDefaultedProps = never; // TODO add names of properties with default values

/**
 * State used in rendering Switch
 */
export interface SwitchState extends ComponentState<SwitchProps, SwitchShorthandProps, SwitchDefaultedProps> {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
}
