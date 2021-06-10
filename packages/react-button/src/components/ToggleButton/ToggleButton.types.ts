import { ComponentState } from '@fluentui/react-utilities';
import { ButtonDefaultedProps, ButtonProps, ButtonShorthandProps, ButtonState } from '../Button/Button.types';

/**
 * {@docCategory Button}
 */
export interface ToggleButtonProps extends ButtonProps {
  /**
   * Defines the controlled checked state of the `ToggleButton`.
   * Mutually exclusive to `defaultChecked`.
   * This should only be used if the checked state is to be controlled at a higher level and there is a plan to pass the
   * correct value based on handling `onClick` events and re-rendering.
   * @default false
   */
  checked?: boolean;

  /**
   * Defines whether the `ToggleButton` is inititally in a checked state or not when rendered.
   * Mutually exclusive to `checked`.
   * @default false
   */
  defaultChecked?: boolean;
}

/**
 * {@docCategory Button}
 */
export type ToggleButtonShorthandProps = ButtonShorthandProps;

/**
 * {@docCategory Button}
 */
export type ToggleButtonDefaultedProps = ButtonDefaultedProps;

/**
 * {@docCategory Button}
 */
export interface ToggleButtonState
  extends ButtonState,
    ComponentState<ToggleButtonProps, ToggleButtonShorthandProps, ToggleButtonDefaultedProps> {}
