import type { ButtonBaseProps, ButtonBaseState, ButtonProps, ButtonState } from '../Button/Button.types';

export type ToggleButtonProps = ButtonProps & {
  /**
   * Defines whether the `ToggleButton` is initially in a checked state or not when rendered.
   *
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * Defines the controlled checked state of the `ToggleButton`.
   * If passed, `ToggleButton` ignores the `defaultChecked` property.
   * This should only be used if the checked state is to be controlled at a higher level and there is a plan to pass the
   * correct value based on handling `onClick` events and re-rendering.
   *
   * @default false
   */
  checked?: boolean;

  /**
   * Defines whether the `ToggleButton` should use the alternate selected styles that have adequate contrast with the rest style
   *
   * @default false
   */
  isAccessible?: boolean;
};

export type ToggleButtonBaseProps = ButtonBaseProps &
  Pick<ToggleButtonProps, 'defaultChecked' | 'checked' | 'isAccessible'>;

export type ToggleButtonState = ButtonState & Required<Pick<ToggleButtonProps, 'checked' | 'isAccessible'>>;

export type ToggleButtonBaseState = ButtonBaseState & Required<Pick<ToggleButtonProps, 'checked' | 'isAccessible'>>;
