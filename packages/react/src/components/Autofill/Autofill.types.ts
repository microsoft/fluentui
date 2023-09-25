import * as React from 'react';
import { Autofill } from './Autofill';
import { KeyCodes } from '../../Utilities';
import type { IRefObject } from '../../Utilities';

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
   * Whether there is a value selected in the input area.
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
   * The current index of where the selection ends. Returns -1 if the input element
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
   * Clear all text in the input. Sets value to `''`.
   */
  clear(): void;
}

/**
 * {@docCategory Autofill}
 */
export interface IAutofillProps extends React.InputHTMLAttributes<HTMLInputElement | Autofill> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<IAutofill>;

  /**
   * The suggested autofill value that will display.
   */
  suggestedDisplayValue?: string;

  /**
   * A callback for when the current input value changes. Called after
   * the state has been changed.
   *
   * @param composing - true if the change event was triggered while the
   * inner input was in the middle of a multi-character composition.
   * (for example, jp-hiragana IME input)
   */
  onInputValueChange?: (newValue?: string, composing?: boolean) => void;

  /**
   * When the user uses left arrow, right arrow, clicks, or deletes text, autofill is disabled
   * since the user has taken control. It is automatically re-enabled when the user enters text and the
   * cursor is at the end of the text in the input box. This prop can be used to override the
   * default list of key presses that will re-enable autofill.
   * @defaultvalue [KeyCodes.down, KeyCodes.up]
   */
  enableAutofillOnKeyPress?: KeyCodes[];

  /**
   * The default value to be visible. This is different from placeholder
   * because it actually sets the current value of the picker.
   * Note: Updates to this prop will not be respected.
   */
  defaultVisibleValue?: string;

  /**
   * Handler for checking and updating the value if needed in `componentWillReceiveProps`.
   * Returns the updated value to set, if needed.
   *
   * @deprecated use standard input `value` prop instead if the autofill should act like a controlled component
   */
  updateValueInWillReceiveProps?: () => string | null;

  /**
   * Handler for checking if the full value of the input should be selected in `componentDidUpdate`.
   * Returns whether the full value of the input should be selected.
   */
  shouldSelectFullInputValueInComponentDidUpdate?: () => boolean;

  /**
   * A callback used to modify the input string. Will entirely override the default behavior if provided.
   * If you just want to be notified of changes, use `onInputValueChange` instead.
   * Called before the state has been updated.
   *
   * @param composing - true if the change event was triggered while the
   * inner input was in the middle of a multi-character composition.
   * (for example, jp-hiragana IME input)
   * @deprecated To control the value, pass in `value` like in any other controlled component.
   * To be notified of changes, use `onInputValueChange`.
   */
  onInputChange?: (value: string, composing: boolean) => string | void;

  /**
   * Should the value of the input be selected? True if we're focused on our input, false otherwise.
   * We need to explicitly not select the text in the autofill if we are no longer focused.
   * In IE11, selecting an input will also focus the input, causing other element's focus to be stolen.
   */
  preventValueSelection?: boolean;
}
