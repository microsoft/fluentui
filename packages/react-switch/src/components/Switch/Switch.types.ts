import * as React from 'react';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';

/**
 * Names of the shorthand properties in SwitchProps
 */
export type SwitchSlots = {
  /**
   * The wrapper around the Switch. It is used to specify the size of the Switch.
   */
  switchWrapper: React.HTMLAttributes<HTMLElement>;

  /**
   * The bar indicating the status of the Switch.
   */
  track: React.HTMLAttributes<HTMLElement>;

  /**
   * The wrapper around the thumb. It is used as the active area for the thumb to position itself.
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
   * Determines whether the label should be positioned before or after the Toggle.
   * @default 'after'
   */
  labelPosition: 'before' | 'after';

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
