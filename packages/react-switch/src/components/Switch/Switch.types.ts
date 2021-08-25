import * as React from 'react';
import type { ComponentPropsCompat, ComponentStateCompat } from '@fluentui/react-utilities';

export interface SwitchCommon extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {}

/**
 * Switch Props
 */
export interface SwitchProps extends ComponentPropsCompat, Partial<SwitchCommon> {}

/**
 * State used in rendering Switch
 */
export interface SwitchState extends ComponentStateCompat<SwitchProps> {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
}
