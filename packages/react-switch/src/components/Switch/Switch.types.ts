import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';

/**
 * Names of the shorthand properties in SwitchProps
 */
export type SwitchSlots = {
  /**
   * The bar indicating the status of the Switch.
   */
  track: React.HTMLAttributes<HTMLElement>;

  /**
   * The wrapper around the thumb. It is used as the active area for the thumb to animate.
   */
  thumbWrapper: React.HTMLAttributes<HTMLElement>;

  /**
   * The circular icon indicating the status of the Switch.
   */
  thumb: React.HTMLAttributes<HTMLElement>;

  /**
   * The hidden input that handles the Switch's internal functionality.
   */
  input: React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>;
};

export interface SwitchCommon extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * The initial value of the Switch.
   * If `true` then the Switch will be enabled.
   *
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * The value of the Switch.
   * If `true` then the Switch will be enabled.
   */
  checked?: boolean;

  /**
   * Whether the Switch should be disabled
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Callback to be called when the checked state value changes.
   */
  onChange?: (
    ev: React.ChangeEvent<HTMLInputElement>,
    data: {
      value: boolean;
    },
  ) => void;
}

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
