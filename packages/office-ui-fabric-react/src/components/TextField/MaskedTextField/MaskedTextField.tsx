import * as React from 'react';
import { TextField } from '../TextField';
import {
  ITextField,
  ITextFieldProps
} from '../TextField.types';
import {
  autobind,
  BaseComponent,
  KeyCodes,
} from '../../../Utilities';

import {
  clearNext,
  clearPrev,
  clearRange,
  getLeftFormatIndex,
  getMaskDisplay,
  getRightFormatIndex,
  IMaskValue,
  insertString,
  parseMask
} from '@uifabric/utilities/lib/inputMask';

/**
 * props.mask:
 *  The string containing the prompt and format characters.
 * Example:
 *  'Phone Number: (999) 9999'
 *
 * _maskCharData
 *  An array of data containing information regarding the format characters,
 *  their indices inside the display text, and their corresponding values.
 * Example:
 *  [
 *    { value: '1', displayIndex: 16, format: /[0-9]/ },
 *    { value: '2', displayIndex: 17, format: /[0-9]/ },
 *    { displayIndex: 18, format: /[0-9]/ },
 *    { value: '4', displayIndex: 22, format: /[0-9]/ },
 *    ...
 *  ]
 */
export interface IMaskedTextFieldState {
  /**
   * The mask string formatted with the input value.
   * This is what is displayed inside the TextField
   * Example:
   *  'Phone Number: 12_ - 4___'
   */
  displayValue: string;
  /** The index into the rendered value of the first unfilled format character */
  maskCursorPosition?: number;
}

export interface IMaskOptions {
  maskPrefix: string;
  maskDisplay: string;
  lastEditablePos: number;
  permanents: IMaskValue[];
}

export class MaskedTextField extends BaseComponent<ITextFieldProps, IMaskedTextFieldState> {
  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _shouldUpdateComponentRef = false;

  private _textField: ITextField;
  private _maskCharData: IMaskValue[];
  // True if the TextField is focused
  private _isFocused: boolean;
  // True if the TextField was not focused and it was clicked into
  private _moveCursorOnMouseUp: boolean;

  // The input data associated with a delete or backspace change
  private _charRemovalData: {
    keyCode: number,
    selectionStart: number,
    selectionEnd: number
  } | null;

  // The clipboard data associated with a paste event
  private _pasteData: {
    selectionStart: number,
    selectionEnd: number
  } | null;

  constructor(props: ITextFieldProps) {
    super(props);

    // Translate mask into charData
    this._maskCharData = parseMask(props.mask);
    this._isFocused = false;
    this._moveCursorOnMouseUp = false;

    this.state = {
      displayValue: getMaskDisplay(
        this.props.mask,
        this._maskCharData,
        this.props.maskChar),
    };
  }

  public componentDidUpdate() {
    // Move the cursor to the start of the mask format on update
    if (this.state.maskCursorPosition) {
      this._textField.setSelectionRange(this.state.maskCursorPosition, this.state.maskCursorPosition);
    }
  }

  public render() {
    return (
      <TextField
        { ...this.props }
        onFocus={ this._onFocus }
        onBlur={ this._onBlur }
        onMouseDown={ this._onMouseDown }
        onMouseUp={ this._onMouseUp }
        onChanged={ this._onInputChange }
        onKeyDown={ this._onKeyDown }
        onPaste={ this._onPaste }
        value={ this.state.displayValue }
        ref={ this._resolveRef('_textField') }
      />
    );
  }

  /**
   * @return The value of all filled format characters or undefined if not all format characters are filled
   */
  public value(): string | undefined {
    let value = '';

    for (let i = 0; i < this._maskCharData.length; i++) {
      if (!this._maskCharData[i].value) {
        return undefined;
      }
      value += this._maskCharData[i].value;
    }
    return value;
  }

  @autobind
  private _onFocus(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {
      mask,
      onFocus
    } = this.props;

    if (onFocus) {
      onFocus(event);
    }

    this._isFocused = true;

    // Move the cursor position to the rightmost unfilled position
    for (let i = 0; i < this._maskCharData.length; i++) {
      if (!this._maskCharData[i].value) {
        this.setState({
          maskCursorPosition: this._maskCharData[i].displayIndex
        });
        break;
      }
    }
  }

  @autobind
  private _onBlur(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {
      onBlur
    } = this.props;

    if (onBlur) {
      onBlur(event);
    }

    this._isFocused = false;
    this._moveCursorOnMouseUp = true;
  }

  @autobind
  private _onMouseDown(event: React.MouseEvent<HTMLInputElement>) {
    if (!this._isFocused) {
      this._moveCursorOnMouseUp = true;
    }
  }

  @autobind
  private _onMouseUp(event: React.MouseEvent<HTMLInputElement>) {
    const {
      mask
    } = this.props;

    // Move the cursor on mouseUp after focusing the textField
    if (this._moveCursorOnMouseUp) {
      this._moveCursorOnMouseUp = false;
      // Move the cursor position to the rightmost unfilled position
      for (let i = 0; i < this._maskCharData.length; i++) {
        if (!this._maskCharData[i].value) {
          this.setState({
            maskCursorPosition: this._maskCharData[i].displayIndex
          });
          break;
        }
      }
    }
  }

  @autobind
  private _onInputChange(value: string) {
    const { displayValue } = this.state;
    const selectionEnd = this._textField.selectionEnd;

    // The initial value of cursorPos does not matter
    let cursorPos = selectionEnd;

    if (this._pasteData) {
      const charsSelected = this._pasteData.selectionEnd - this._pasteData.selectionStart,
        charCount = value.length + charsSelected - displayValue.length,
        startPos = selectionEnd - charCount,
        pastedString = value.substr(startPos, charCount);

      // Clear any selected characters
      if (charsSelected) {
        this._maskCharData = clearRange(this._maskCharData, this._pasteData.selectionStart, charsSelected);
      }
      cursorPos = insertString(this._maskCharData, startPos, pastedString);

      this._pasteData = null;
    } else if (this._charRemovalData) {
      // isDel is true If the characters are removed LTR, otherwise RTL
      const isDel = this._charRemovalData.keyCode === KeyCodes.del,
        charCount = this._charRemovalData.selectionEnd - this._charRemovalData.selectionStart;

      if (charCount) { // charCount is > 0 if range was deleted
        this._maskCharData = clearRange(this._maskCharData, this._charRemovalData.selectionStart, charCount);
        cursorPos = getRightFormatIndex(this._maskCharData, this._charRemovalData.selectionStart);
      } else { // If charCount === 0, there was no selection and a single character was deleted
        if (isDel) {
          this._maskCharData = clearNext(this._maskCharData, this._charRemovalData.selectionStart);
          cursorPos = getRightFormatIndex(this._maskCharData, this._charRemovalData.selectionStart);
        } else {
          this._maskCharData = clearPrev(this._maskCharData, this._charRemovalData.selectionStart);
          cursorPos = getLeftFormatIndex(this._maskCharData, this._charRemovalData.selectionStart);
        }
      }
      this._charRemovalData = null;
    } else if (value.length > displayValue.length) {
      // This case is if the user added characters
      const charCount = value.length - displayValue.length,
        startPos = selectionEnd - charCount,
        enteredString = value.substr(startPos, charCount);

      cursorPos = insertString(this._maskCharData, startPos, enteredString);
    } else if (value.length <= displayValue.length) {
      /**
       * This case is reached only if the user has selected a block of 1 or more
       * characters and input a character replacing the characters they've selected.
       */
      const charCount = 1,
        selectCount = displayValue.length + charCount - value.length,
        startPos = selectionEnd - charCount,
        enteredString = value.substr(startPos, charCount);

      // Clear the selected range
      this._maskCharData = clearRange(this._maskCharData, startPos, selectCount);
      // Insert the printed character
      cursorPos = insertString(this._maskCharData, startPos, enteredString);
    }

    this.setState({
      displayValue: getMaskDisplay(
        this.props.mask,
        this._maskCharData,
        this.props.maskChar),
      maskCursorPosition: cursorPos
    });
  }

  @autobind
  private _onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    this._charRemovalData = null;
    if (this._textField.value) {
      const {
        keyCode,
        ctrlKey,
        metaKey
      } = event;

      // Ignore ctrl and meta keydown
      if (ctrlKey || metaKey) {
        return;
      }

      // On backspace or delete, store the selection and the keyCode
      if (keyCode === KeyCodes.backspace || keyCode === KeyCodes.del) {
        const selectionStart = (event.target as HTMLInputElement).selectionStart,
          selectionEnd = (event.target as HTMLInputElement).selectionEnd;

        // Check if backspace or delete press is valid.
        if (!(keyCode === KeyCodes.backspace && selectionEnd > 0)
          && !(keyCode === KeyCodes.del && selectionStart < this._textField.value.length)) {
          return;
        }

        this._charRemovalData = {
          keyCode,
          selectionStart,
          selectionEnd
        };
      }
    }
  }

  @autobind
  private _onPaste(event: React.ClipboardEvent<HTMLInputElement>) {
    const selectionStart = (event.target as HTMLInputElement).selectionStart,
      selectionEnd = (event.target as HTMLInputElement).selectionEnd;
    // Store the paste selection range
    this._pasteData = {
      selectionStart,
      selectionEnd
    };
  }
}
