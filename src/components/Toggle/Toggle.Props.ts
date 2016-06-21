import * as React from 'react';

/**
 * Toggle component props.
 */
export interface IToggleProps extends React.HTMLProps<HTMLInputElement> {
  /**
   * A label for the toggle.
   */
  label: string;

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
  onChanged?: (isChecked: boolean) => void;
}