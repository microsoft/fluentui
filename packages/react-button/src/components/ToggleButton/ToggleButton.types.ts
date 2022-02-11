import type { ButtonProps, ButtonState } from '../Button/Button.types';
import { ComponentRender } from '@fluentui/react-utilities';

type ToggleButtonCommons = {
  /**
   * Defines the controlled checked state of the `ToggleButton`.
   * If passed, `ToggleButton` ignores the `defaultChecked` property.
   * This should only be used if the checked state is to be controlled at a higher level and there is a plan to pass the
   * correct value based on handling `onClick` events and re-rendering.
   * @default false
   */
  checked: boolean;
};

export type ToggleButtonProps = ButtonProps &
  Partial<ToggleButtonCommons> & {
    /**
     * Defines whether the `ToggleButton` is initially in a checked state or not when rendered.
     * @default false
     */
    defaultChecked?: boolean;
  };

export type ToggleButtonState = ButtonState & ToggleButtonCommons;

export type ToggleButtonRender = ComponentRender<ToggleButtonState>;
