import * as React from 'react';
import { Toggle } from './Toggle';

export interface IToggle {
  focus: () => void;
}
/**
 * Toggle component props.
 */
export interface IToggleProps extends React.HTMLProps<HTMLInputElement | Toggle> {
  /**
   * Optional way to fetch the IButton interface. Use this instead of ref, to avoid accessing higher-order component
   * wrappers rather than the IButton interface.
   */
  componentRef?: (component: IToggle) => void;

  /**
   * A label for the toggle.
   */
  label?: string;

  /**
   * Text to display when toggle is ON.
   */
  onText?: string;

  /**
   * Test display when toggle is OFF.
   */
  offText?: string;

  /**
   * Checked state of the toggle. If you are maintaining state yourself, use this property. Otherwise refer to 'defaultChecked'.
   */
  checked?: boolean;

  /**
   * Initial state of the toggle. If you want the toggle to maintain its own state, use this. Otherwise refer to 'checked'.
   */
  defaultChecked?: boolean;

  /**
   * Optional disabled flag.
   */
  disabled?: boolean;

  /**
   * onchange callback.
   */
  onChanged?: (checked: boolean) => void;
}