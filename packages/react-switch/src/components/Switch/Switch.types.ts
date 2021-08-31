import * as React from 'react';
import type { ComponentPropsCompat, ComponentStateCompat, ShorthandPropsCompat } from '@fluentui/react-utilities';

/**
 * Names of the shorthand properties in SwitchProps
 */
export interface SwitchProps
  extends ComponentPropsCompat,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /**
   * The wrapper around the Switch. It is used to specify the size of the Switch.
   */
  switchWrapper?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * The bar indicating the status of the Switch.
   */
  track?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * The wrapper around the thumb. It is used as the active area for the thumb to position itself.
   */
  thumbWrapper?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * The circular icon indicating the status of the Switch.
   */
  thumb?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * The hidden input that handles the Switch's internal functionality.
   */
  input?: ShorthandPropsCompat<React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>>;

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

/**
 * Names of the shorthand properties in SwitchProps
 */
export type SwitchShorthandProps = 'switchWrapper' | 'track' | 'thumbWrapper' | 'thumb' | 'input';

/**
 * Names of SwitchProps that have a default value in useSwitch
 */
export type SwitchDefaultedProps = 'switchWrapper' | 'track' | 'thumbWrapper' | 'thumb' | 'input';

/**
 * State used in rendering Switch
 */
export interface SwitchState extends ComponentStateCompat<SwitchProps, SwitchShorthandProps, SwitchDefaultedProps> {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
}
