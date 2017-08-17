import * as React from 'react';
import { BaseAutoFill } from './BaseAutoFill';
import { KeyCodes } from '../../../Utilities';
export interface IBaseAutoFill {

  /**
   * The current index of the cursor in the input area. Returns -1 if the input element
   * is not ready.
   */
  cursorLocation: number;
  /**
   * A boolean for whether or not there is a value selected in the input area.
   */
  isValueSelected: boolean;
  /**
   * The current text value that the user has entered.
   */
  value: string;
  /**
   * The current index of where the selection starts. Returns -1 if the input element
   * is not ready.
   */
  selectionStart: number;
  /**
   * the current index of where the selection ends. Returns -1 if the input element
   * is not ready.
   */
  selectionEnd: number;
  /**
   * The current input element.
   */
  inputElement: HTMLInputElement;
  /**
   * Focus the input element.
   */
  focus(): void;
  /**
   * Clear all text in the input. Sets value to '';
   */
  clear(): void;
}

export interface IBaseAutoFillProps extends
  React.InputHTMLAttributes<HTMLInputElement | BaseAutoFill> {
  /**
   * Gets the compoonent ref.
   */
  componentRef?: (componentRef?: IBaseAutoFill) => void;

  /**
   * The suggested autofill value that will display.
   */
  suggestedDisplayValue?: string;
  /**
   * A callback for when the current input value changes.
   */
  onInputValueChange?: (newValue?: string) => void;

  /**
   * When the user uses left arrow, right arrow, clicks, or deletes text autofill is disabled
   * Since the user has taken control. It is automatically reenabled when the user enters text and the
   * cursor is at the end of the text in the input box. This specifies other key presses that will reenabled
   * autofill.
   * @default [KeyCodes.down, KeyCodes.up]
   */
  enableAutoFillOnKeyPress?: KeyCodes[];

  /**
   * the default value to be visible
   */
  defaultVisibleValue?: string;

  /**
   * Handler for checking and updating the value if needed
   *  in componentWillReceiveProps
   *
   * @param {IBaseAutoFillProps} defaultVisibleValue - the defaultVisibleValue that got passed
   *  in to the auto fill's componentWillReceiveProps
   * @returns {string} - the updated value to set, if needed
   */
  updateValueInWillReceiveProps?: () => string | null;

  /**
   * Handler for checking if the full value of the input should
   * be seleced in componentDidUpdate
   *
   * @returns {boolean} - should the full value of the input be selected?
   */
  shouldSelectFullInputValueInComponentDidUpdate?: () => boolean;

}