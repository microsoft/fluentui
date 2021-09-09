import * as React from 'react';
import type { ComponentProps, ComponentState, ObjectShorthandProps } from '@fluentui/react-utilities';

export type SwitchSlots = {
  /**
   * The root of the Switch.
   */
  root: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

  /**
   * The bar indicating the status of the Switch.
   */
  track: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

  /**
   * The wrapper around the thumb. It is used as the active area for the thumb to position itself.
   */
  thumbWrapper: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

  /**
   * The circular icon indicating the status of the Switch.
   */
  thumb: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

  /**
   * The hidden input that handles the Switch's internal functionality.
   */
  input: ObjectShorthandProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
};

export interface SwitchCommons {
  /**
   * The starting value for a uncontrolled Switch. If `true` then the Switch will be enabled.
   * Mutually exclusive with `checked` prop.
   *
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * The current value for a controlled Switch. If `true` then the Switch will be enabled.
   * Mutually exclusive with `defaultChecked` prop.
   */
  checked?: boolean;

  /**
   * Whether the Switch should be disabled.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Callback to be called when the `checked` value changes.
   */
  onChange?: (
    ev: React.ChangeEvent<HTMLInputElement>,
    data: {
      checked: boolean;
    },
  ) => void;
}

export interface SwitchProps extends Omit<ComponentProps<SwitchSlots>, 'onChange'>, SwitchCommons {}

export interface SwitchState extends ComponentState<SwitchSlots>, SwitchCommons {}
