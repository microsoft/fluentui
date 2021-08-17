import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';

/**
 * Names of the shorthand properties in SwitchProps
 */
export type SwitchSlots = {};

export interface SwitchCommon extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {}

/**
 * Switch Props
 */
export interface SwitchProps extends ComponentProps<Partial<SwitchSlots>>, Partial<SwitchCommon> {}

/**
 * State used in rendering Switch
 */
export interface SwitchState extends ComponentState<SwitchSlots>, SwitchCommon {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
}
