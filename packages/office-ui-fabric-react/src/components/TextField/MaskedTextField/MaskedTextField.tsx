import * as React from 'react';
import { TextField } from '../TextField';
import { ITextField, ITextFieldProps } from '../TextField.types';
import { initializeComponentRef, KeyCodes } from '../../../Utilities';

import {
  clearNext,
  clearPrev,
  clearRange,
  DEFAULT_MASK_FORMAT_CHARS,
  getLeftFormatIndex,
  getMaskDisplay,
  getRightFormatIndex,
  IMaskValue,
  insertString,
  parseMask
} from './inputMask';

/**
 * State for the MaskedTextField component.
 */
export interface IMaskedTextFieldState {
  /**
   * The mask string formatted with the input value.
   * This is what is displayed inside the TextField
   * @example
   *  `Phone Number: 12_ - 4___`
   */
  displayValue: string;
  /** The index into the rendered value of the first unfilled format character */
  maskCursorPosition?: number;
}

export const DEFAULT_MASK_CHAR = '_';

type InputChangeType = 'default' | 'backspace' | 'delete' | 'textPasted';

export class MaskedTextField extends React.Component<ITextFieldProps, IMaskedTextFieldState> implements ITextField {
  public static defaultProps: ITextFieldProps = {
    maskChar: DEFAULT_MASK_CHAR,
    maskFormat: DEFAULT_MASK_FORMAT_CHARS
  };
  /**
   * Tell BaseComponent to bypass resolution of componentRef.
   */
  protected _skipComponentRefResolution = true;

  private _textField = React.createRef<ITextField>();

  /**
   *  An array of data containing information regarding the format characters,
   *  their indices inside the display text, and their corresponding values.
   * @example
   * ```
   *  [
   *    { value: '1', displayIndex: 16, format: /[0-9]/ },
   *    { value: '2', displayIndex: 17, format: /[0-9]/ },
   *    { displayIndex: 18, format: /[0-9]/ },
   *    { value: '4', displayIndex: 22, format: /[0-9]/ },
   *    ...
   *  ]
   * ```
   */
  private _maskCharData: IMaskValue[];
  /** True if the TextField is focused */
  private _isFocused: boolean;
  /** True if the TextField was not focused and it was clicked into */
  private _moveCursorOnMouseUp: boolean;

  /** The stored selection data prior to input change events. */
  private _changeSelectionData: {
    changeType: InputChangeType;
    selectionStart: number;
    selectionEnd: number;
  } | null;

  constructor(props: ITextFieldProps) {
    super(props);

    initializeComponentRef(this);

    // Translate mask into charData
    this._maskCharData = parseMask(props.mask, props.maskFormat);
    // If an initial value is provided, use it to populate the format chars
    props.value !== undefined && this.setValue(props.value);

    this._isFocused = false;
    this._moveCursorOnMouseUp = false;

    this.state = {
      displayValue: getMaskDisplay(props.mask, this._maskCharData, props.maskChar)
    };
  }

  // tslint:disable-next-line function-name
  public UNSAFE_componentWillReceiveProps(newProps: ITextFieldProps) {
    if (newProps.mask !== this.props.mask || newProps.value !== this.props.value) {
      this._maskCharData = parseMask(newProps.mask, newProps.maskFormat);
      newProps.value !== undefined && this.setValue(newProps.value);

      this.setState({
        displayValue: getMaskDisplay(newProps.mask, this._maskCharData, newProps.maskChar)
      });
    }
  }

  public componentDidUpdate() {
    // Move the cursor to the start of the mask format on update
    if (this.state.maskCursorPosition !== undefined && this._textField.current) {
      this._textField.current.setSelectionRange(this.state.maskCursorPosition, this.state.maskCursorPosition);
    }
  }

  public render() {
    return (
      <TextField
        {...this.props}
        onFocus={this._onFocus}
        onBlur={this._onBlur}
        onMouseDown={this._onMouseDown}
        onMouseUp={this._onMouseUp}
        onChange={this._onInputChange}
        onKeyDown={this._onKeyDown}
        onPaste={this._onPaste}
        value={this.state.displayValue || ''}
        componentRef={this._textField}
      />
    );
  }

  /**
   * @returns The value of all filled format characters or undefined if not all format characters are filled
   */
  public get value(): string | undefined {
    let value = '';

    for (let i = 0; i < this._maskCharData.length; i++) {
      if (!this._maskCharData[i].value) {
        return undefined;
      }
      value += this._maskCharData[i].value;
    }
    return value;
  }

  public setValue(newValue: string): void {
    let valueIndex = 0,
      charDataIndex = 0;

    while (valueIndex < newValue.length && charDataIndex < this._maskCharData.length) {
      // Test if the next character in the new value fits the next format character
      const testVal = newValue[valueIndex];
      if (this._maskCharData[charDataIndex].format.test(testVal)) {
        this._maskCharData[charDataIndex].value = testVal;
        charDataIndex++;
      }
      valueIndex++;
    }
  }

  public focus(): void {
    const { current } = this._textField;

    current && current.focus();
  }

  public blur(): void {
    const { current } = this._textField;

    current && current.blur();
  }

  public select(): void {
    const { current } = this._textField;

    current && current.select();
  }

  public setSelectionStart(value: number): void {
    const { current } = this._textField;

    current && current.setSelectionStart(value);
  }

  public setSelectionEnd(value: number): void {
    const { current } = this._textField;

    current && current.setSelectionEnd(value);
  }

  public setSelectionRange(start: number, end: number): void {
    const { current } = this._textField;
    current && current.setSelectionRange(start, end);
  }

  public get selectionStart(): number | null {
    const { current } = this._textField;

    return current && current.selectionStart !== null ? current.selectionStart : -1;
  }

  public get selectionEnd(): number | null {
    const { current } = this._textField;

    return current && current.selectionEnd ? current.selectionEnd : -1;
  }

  private _onFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }

    this._isFocused = true;

    // Move the cursor position to the leftmost unfilled position
    for (let i = 0; i < this._maskCharData.length; i++) {
      if (!this._maskCharData[i].value) {
        this.setState({
          maskCursorPosition: this._maskCharData[i].displayIndex
        });
        break;
      }
    }
  };

  private _onBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }

    this._isFocused = false;
    this._moveCursorOnMouseUp = true;
  };

  private _onMouseDown = (event: React.MouseEvent<HTMLInputElement>) => {
    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }

    if (!this._isFocused) {
      this._moveCursorOnMouseUp = true;
    }
  };

  private _onMouseUp = (event: React.MouseEvent<HTMLInputElement>) => {
    if (this.props.onMouseUp) {
      this.props.onMouseUp(event);
    }

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
  };

  private _onInputChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string) => {
    const textField = this._textField.current;
    if (this._changeSelectionData === null && textField) {
      this._changeSelectionData = {
        changeType: 'default',
        selectionStart: textField.selectionStart !== null ? textField.selectionStart : -1,
        selectionEnd: textField.selectionEnd !== null ? textField.selectionEnd : -1
      };
    }
    if (!this._changeSelectionData) {
      return;
    }

    const { displayValue } = this.state;

    // The initial value of cursorPos does not matter
    let cursorPos = 0;
    const { changeType, selectionStart, selectionEnd } = this._changeSelectionData;

    if (changeType === 'textPasted') {
      const charsSelected = selectionEnd - selectionStart,
        charCount = value.length + charsSelected - displayValue.length,
        startPos = selectionStart,
        pastedString = value.substr(startPos, charCount);

      // Clear any selected characters
      if (charsSelected) {
        this._maskCharData = clearRange(this._maskCharData, selectionStart, charsSelected);
      }
      cursorPos = insertString(this._maskCharData, startPos, pastedString);
    } else if (changeType === 'delete' || changeType === 'backspace') {
      // isDel is true If the characters are removed LTR, otherwise RTL
      const isDel = changeType === 'delete',
        charCount = selectionEnd - selectionStart;

      if (charCount) {
        // charCount is > 0 if range was deleted
        this._maskCharData = clearRange(this._maskCharData, selectionStart, charCount);
        cursorPos = getRightFormatIndex(this._maskCharData, selectionStart);
      } else {
        // If charCount === 0, there was no selection and a single character was deleted
        if (isDel) {
          this._maskCharData = clearNext(this._maskCharData, selectionStart);
          cursorPos = getRightFormatIndex(this._maskCharData, selectionStart);
        } else {
          this._maskCharData = clearPrev(this._maskCharData, selectionStart);
          cursorPos = getLeftFormatIndex(this._maskCharData, selectionStart);
        }
      }
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

    this._changeSelectionData = null;

    const newValue = getMaskDisplay(this.props.mask, this._maskCharData, this.props.maskChar);

    this.setState({
      displayValue: newValue,
      maskCursorPosition: cursorPos
    });

    // Perform onChange after input has been processed. Return value is expected to be the displayed text
    if (this.props.onChange) {
      this.props.onChange(ev, newValue);
    }
  };

  private _onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { current } = this._textField;

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }

    this._changeSelectionData = null;
    if (current && current.value) {
      const { keyCode, ctrlKey, metaKey } = event;

      // Ignore ctrl and meta keydown
      if (ctrlKey || metaKey) {
        return;
      }

      // On backspace or delete, store the selection and the keyCode
      if (keyCode === KeyCodes.backspace || keyCode === KeyCodes.del) {
        const selectionStart = (event.target as HTMLInputElement).selectionStart,
          selectionEnd = (event.target as HTMLInputElement).selectionEnd;

        // Check if backspace or delete press is valid.
        if (
          !(keyCode === KeyCodes.backspace && selectionEnd && selectionEnd > 0) &&
          !(keyCode === KeyCodes.del && selectionStart !== null && selectionStart < current.value.length)
        ) {
          return;
        }

        this._changeSelectionData = {
          changeType: keyCode === KeyCodes.backspace ? 'backspace' : 'delete',
          selectionStart: selectionStart !== null ? selectionStart : -1,
          selectionEnd: selectionEnd !== null ? selectionEnd : -1
        };
      }
    }
  };

  private _onPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    if (this.props.onPaste) {
      this.props.onPaste(event);
    }

    const selectionStart = (event.target as HTMLInputElement).selectionStart,
      selectionEnd = (event.target as HTMLInputElement).selectionEnd;
    // Store the paste selection range
    this._changeSelectionData = {
      changeType: 'textPasted',
      selectionStart: selectionStart !== null ? selectionStart : -1,
      selectionEnd: selectionEnd !== null ? selectionEnd : -1
    };
  };
}
