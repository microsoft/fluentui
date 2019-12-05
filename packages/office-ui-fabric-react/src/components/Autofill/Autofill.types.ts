import * as React from 'react';
import { Autofill } from './Autofill';
import { IRefObject, KeyCodes } from '../../Utilities';

/**
 * {@docCategory Autofill}
 */
export interface IAutofill {
  /**
   * The current index of the cursor in the input area. Returns -1 if the input element
   * is not ready.
   */
  cursorLocation: number | null;
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
  selectionStart: number | null;
  /**
   * the current index of where the selection ends. Returns -1 if the input element
   * is not ready.
   */
  selectionEnd: number | null;
  /**
   * The current input element.
   */
  inputElement: HTMLInputElement | null;
  /**
   * Focus the input element.
   */
  focus(): void;
  /**
   * Clear all text in the input. Sets value to '';
   */
  clear(): void;
}

/**
 * {@docCategory Autofill}
 */
export interface IAutofillProps extends React.InputHTMLAttributes<HTMLInputElement | Autofill> {
  /**
   * Gets the compoonent ref.
   */
  componentRef?: IRefObject<IAutofill>;

  /**
   * The suggested autofill value that will display.
   */
  suggestedDisplayValue?: string;

  /**
   * A callback for when the current input value changes.
   *
   * @param composing - true if the change event was triggered while the
   * inner input was in the middle of a multi-character composition.
   * (for example, jp-hiragana IME input)
   */
  onInputValueChange?: (newValue?: string, composing?: boolean) => void;

  /**
   * When the user uses left arrow, right arrow, clicks, or deletes text autofill is disabled
   * Since the user has taken control. It is automatically reenabled when the user enters text and the
   * cursor is at the end of the text in the input box. This specifies other key presses that will reenabled
   * autofill.
   * @defaultvalue [KeyCodes.down, KeyCodes.up]
   */
  enableAutofillOnKeyPress?: KeyCodes[];

  /**
   * The default value to be visible. This is different from placeholder
   * because it actually sets the current value of the picker
   * Note: This will only be set upon component creation
   * and will not update with subsequent prop updates.
   */
  defaultVisibleValue?: string;

  /**
   * Handler for checking and updating the value if needed
   * in componentWillReceiveProps
   *
   * @returns - the updated value to set, if needed
   */
  updateValueInWillReceiveProps?: () => string | null;

  /**
   * Handler for checking if the full value of the input should
   * be seleced in componentDidUpdate
   *
   * @returns - should the full value of the input be selected?
   */
  shouldSelectFullInputValueInComponentDidUpdate?: () => boolean;

  /**
   * A callback used to modify the input string.
   *
   * @param composing - true if the change event was triggered while the
   * inner input was in the middle of a multi-character composition.
   * (for example, jp-hiragana IME input)
   */
  onInputChange?: (value: string, composing: boolean) => string;

  /**
   * Should the value of the input be selected? True if we're focused on our input, false otherwise.
   * We need to explicitly not select the text in the autofill if we are no longer focused.
   * In IE11, selecting a input will also focus the input, causing other element's focus to be stolen.
   */
  preventValueSelection?: boolean;
}

/**
 * Deprecated, do not use.
 * @deprecated do not use, will be removed in 6.0
 * {@docCategory Autofill}
 */
export interface IBaseAutoFill extends IAutofill {}

/**
 * Deprecated, do not use.
 * @deprecated do not use, will be removed in 6.0
 * {@docCategory Autofill}
 */
export interface IBaseAutoFillProps extends IAutofillProps {}
