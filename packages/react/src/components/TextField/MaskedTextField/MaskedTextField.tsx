import * as React from 'react';
import { TextField } from '../TextField';
import { KeyCodes } from '../../../Utilities';
import {
  clearNext,
  clearPrev,
  clearRange,
  DEFAULT_MASK_FORMAT_CHARS,
  getLeftFormatIndex,
  getMaskDisplay,
  getRightFormatIndex,
  insertString,
  parseMask,
} from './inputMask';
import { useConst, useIsomorphicLayoutEffect } from '@fluentui/react-hooks';
import type { IMaskedTextFieldProps, IMaskedTextField } from '../TextField.types';
import type { IRefObject } from '../../../Utilities';
import type { IMaskValue } from './inputMask';

interface IMaskedTextFieldInternalState {
  maskCharData: IMaskValue[];
  isFocused: boolean;
  moveCursorOnMouseUp: boolean;
  changeSelectionData: {
    changeType: 'default' | 'backspace' | 'delete' | 'textPasted';
    selectionStart: number;
    selectionEnd: number;
  } | null;
}

const COMPONENT_NAME = 'MaskedTextField';

const useComponentRef = (
  componentRef: IRefObject<IMaskedTextField> | undefined,
  internalState: IMaskedTextFieldInternalState,
  textField: React.RefObject<IMaskedTextField>,
) => {
  React.useImperativeHandle(
    componentRef,
    (): IMaskedTextField => ({
      get value() {
        let value = '';

        for (let i = 0; i < internalState.maskCharData.length; i++) {
          if (!internalState.maskCharData[i].value) {
            return undefined;
          }
          value += internalState.maskCharData[i].value;
        }
        return value;
      },

      get selectionStart(): number | null {
        return textField.current && textField.current.selectionStart !== null ? textField.current.selectionStart : -1;
      },

      get selectionEnd(): number | null {
        return textField.current && textField.current.selectionEnd ? textField.current.selectionEnd : -1;
      },

      focus(): void {
        textField.current && textField.current.focus();
      },

      blur(): void {
        textField.current && textField.current.blur();
      },

      select(): void {
        textField.current && textField.current.select();
      },

      setSelectionStart(value: number): void {
        textField.current && textField.current.setSelectionStart(value);
      },

      setSelectionEnd(value: number): void {
        textField.current && textField.current.setSelectionEnd(value);
      },

      setSelectionRange(start: number, end: number): void {
        textField.current && textField.current.setSelectionRange(start, end);
      },
    }),
    [internalState, textField],
  );
};

export const DEFAULT_MASK_CHAR = '_';

export const MaskedTextField: React.FunctionComponent<IMaskedTextFieldProps> = React.forwardRef<
  HTMLDivElement,
  IMaskedTextFieldProps
>((props, ref) => {
  const textField = React.useRef<IMaskedTextField>(null);

  const {
    componentRef,
    onFocus,
    onBlur,
    onMouseDown,
    onMouseUp,
    onChange,
    onPaste,
    onKeyDown,
    mask,
    maskChar = DEFAULT_MASK_CHAR,
    maskFormat = DEFAULT_MASK_FORMAT_CHARS,
    value,
  } = props;

  const internalState = useConst<IMaskedTextFieldInternalState>(() => ({
    maskCharData: parseMask(mask, maskFormat),
    isFocused: false,
    moveCursorOnMouseUp: false,
    changeSelectionData: null,
  }));

  /** The index into the rendered value of the first unfilled format character */
  const [maskCursorPosition, setMaskCursorPosition] = React.useState<number | undefined>();

  /**
   * The mask string formatted with the input value.
   * This is what is displayed inside the TextField
   * @example
   *  `Phone Number: 12_ - 4___`
   */
  const [displayValue, setDisplayValue] = React.useState<string>(() =>
    getMaskDisplay(mask, internalState.maskCharData, maskChar),
  );

  const setValue = React.useCallback(
    (newValue: string): void => {
      let valueIndex = 0;
      let charDataIndex = 0;

      while (valueIndex < newValue.length && charDataIndex < internalState.maskCharData.length) {
        // Test if the next character in the new value fits the next format character
        const testVal = newValue[valueIndex];
        if (internalState.maskCharData[charDataIndex].format.test(testVal)) {
          internalState.maskCharData[charDataIndex].value = testVal;
          charDataIndex++;
        }
        valueIndex++;
      }
    },
    [internalState],
  );

  const handleFocus = React.useCallback(
    (ev: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onFocus?.(ev);
      internalState.isFocused = true;

      // Move the cursor position to the leftmost unfilled position
      for (let i = 0; i < internalState.maskCharData.length; i++) {
        if (!internalState.maskCharData[i].value) {
          setMaskCursorPosition(internalState.maskCharData[i].displayIndex);
          break;
        }
      }
    },
    [internalState, onFocus],
  );

  const handleBlur = React.useCallback(
    (ev: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onBlur?.(ev);
      internalState.isFocused = false;
      internalState.moveCursorOnMouseUp = true;
    },
    [internalState, onBlur],
  );

  const handleMouseDown = React.useCallback(
    (ev: React.MouseEvent<HTMLInputElement>) => {
      onMouseDown?.(ev);
      if (!internalState.isFocused) {
        internalState.moveCursorOnMouseUp = true;
      }
    },
    [internalState, onMouseDown],
  );

  const handleMouseUp = React.useCallback(
    (ev: React.MouseEvent<HTMLInputElement>) => {
      onMouseUp?.(ev);
      // Move the cursor on mouseUp after focusing the textField
      if (internalState.moveCursorOnMouseUp) {
        internalState.moveCursorOnMouseUp = false;
        // Move the cursor position to the rightmost unfilled position
        for (let i = 0; i < internalState.maskCharData.length; i++) {
          if (!internalState.maskCharData[i].value) {
            setMaskCursorPosition(internalState.maskCharData[i].displayIndex);
            break;
          }
        }
      }
    },
    [internalState, onMouseUp],
  );

  const handleInputChange = React.useCallback(
    (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, inputValue: string) => {
      if (internalState.changeSelectionData === null && textField.current) {
        internalState.changeSelectionData = {
          changeType: 'default',
          selectionStart: textField.current.selectionStart !== null ? textField.current.selectionStart : -1,
          selectionEnd: textField.current.selectionEnd !== null ? textField.current.selectionEnd : -1,
        };
      }
      if (!internalState.changeSelectionData) {
        return;
      }

      // The initial value of cursorPos does not matter
      let cursorPos = 0;
      const { changeType, selectionStart, selectionEnd } = internalState.changeSelectionData;

      if (changeType === 'textPasted') {
        const charsSelected = selectionEnd - selectionStart;
        const charCount = inputValue.length + charsSelected - displayValue.length;
        const startPos = selectionStart;
        const pastedString = inputValue.substr(startPos, charCount);

        // Clear any selected characters
        if (charsSelected) {
          internalState.maskCharData = clearRange(internalState.maskCharData, selectionStart, charsSelected);
        }
        cursorPos = insertString(internalState.maskCharData, startPos, pastedString);
      } else if (changeType === 'delete' || changeType === 'backspace') {
        // isDel is true If the characters are removed LTR, otherwise RTL
        const isDel = changeType === 'delete';
        const charCount = selectionEnd - selectionStart;

        if (charCount) {
          // charCount is > 0 if range was deleted
          internalState.maskCharData = clearRange(internalState.maskCharData, selectionStart, charCount);
          cursorPos = getRightFormatIndex(internalState.maskCharData, selectionStart);
        } else {
          // If charCount === 0, there was no selection and a single character was deleted
          if (isDel) {
            internalState.maskCharData = clearNext(internalState.maskCharData, selectionStart);
            cursorPos = getRightFormatIndex(internalState.maskCharData, selectionStart);
          } else {
            internalState.maskCharData = clearPrev(internalState.maskCharData, selectionStart);
            cursorPos = getLeftFormatIndex(internalState.maskCharData, selectionStart);
          }
        }
      } else if (inputValue.length > displayValue.length) {
        // This case is if the user added characters
        const charCount = inputValue.length - displayValue.length;
        const startPos = selectionEnd - charCount;
        const enteredString = inputValue.substr(startPos, charCount);

        cursorPos = insertString(internalState.maskCharData, startPos, enteredString);
      } else if (inputValue.length <= displayValue.length) {
        /**
         * This case is reached only if the user has selected a block of 1 or more
         * characters and input a character replacing the characters they've selected.
         */
        const charCount = 1;
        const selectCount = displayValue.length + charCount - inputValue.length;
        const startPos = selectionEnd - charCount;
        const enteredString = inputValue.substr(startPos, charCount);

        // Clear the selected range
        internalState.maskCharData = clearRange(internalState.maskCharData, startPos, selectCount);
        // Insert the printed character
        cursorPos = insertString(internalState.maskCharData, startPos, enteredString);
      }

      internalState.changeSelectionData = null;

      const newValue = getMaskDisplay(mask, internalState.maskCharData, maskChar);

      setDisplayValue(newValue);
      setMaskCursorPosition(cursorPos);

      // Perform onChange after input has been processed. Return value is expected to be the displayed text
      onChange?.(ev, newValue);
    },
    [displayValue.length, internalState, mask, maskChar, onChange],
  );

  const handleKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(ev);

      internalState.changeSelectionData = null;
      if (textField.current && textField.current.value) {
        // eslint-disable-next-line deprecation/deprecation
        const { keyCode, ctrlKey, metaKey } = ev;

        // Ignore ctrl and meta keydown
        if (ctrlKey || metaKey) {
          return;
        }

        // On backspace or delete, store the selection and the keyCode
        if (keyCode === KeyCodes.backspace || keyCode === KeyCodes.del) {
          const selectionStart = (ev.target as HTMLInputElement).selectionStart;
          const selectionEnd = (ev.target as HTMLInputElement).selectionEnd;

          // Check if backspace or delete press is valid.
          if (
            !(keyCode === KeyCodes.backspace && selectionEnd && selectionEnd > 0) &&
            !(keyCode === KeyCodes.del && selectionStart !== null && selectionStart < textField.current.value.length)
          ) {
            return;
          }

          internalState.changeSelectionData = {
            changeType: keyCode === KeyCodes.backspace ? 'backspace' : 'delete',
            selectionStart: selectionStart !== null ? selectionStart : -1,
            selectionEnd: selectionEnd !== null ? selectionEnd : -1,
          };
        }
      }
    },
    [internalState, onKeyDown],
  );

  const handlePaste = React.useCallback(
    (ev: React.ClipboardEvent<HTMLInputElement>) => {
      onPaste?.(ev);

      const selectionStart = (ev.target as HTMLInputElement).selectionStart;
      const selectionEnd = (ev.target as HTMLInputElement).selectionEnd;
      // Store the paste selection range
      internalState.changeSelectionData = {
        changeType: 'textPasted',
        selectionStart: selectionStart !== null ? selectionStart : -1,
        selectionEnd: selectionEnd !== null ? selectionEnd : -1,
      };
    },
    [internalState, onPaste],
  );

  // Updates the display value if mask or value props change.
  React.useEffect(() => {
    internalState.maskCharData = parseMask(mask, maskFormat);
    value !== undefined && setValue(value);
    setDisplayValue(getMaskDisplay(mask, internalState.maskCharData, maskChar));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Should only update when mask or value changes.
  }, [mask, value]);

  // Run before browser paint to avoid flickering from selection reset.
  useIsomorphicLayoutEffect(() => {
    // Move the cursor to position before paint.
    if (maskCursorPosition !== undefined && textField.current) {
      textField.current.setSelectionRange(maskCursorPosition, maskCursorPosition);
    }
  }, [maskCursorPosition]);

  // Run after browser paint.
  React.useEffect(() => {
    // Move the cursor to the start of the mask format after values update.
    if (internalState.isFocused && maskCursorPosition !== undefined && textField.current) {
      textField.current.setSelectionRange(maskCursorPosition, maskCursorPosition);
    }
  });

  useComponentRef(componentRef, internalState, textField);

  return (
    <TextField
      {...props}
      elementRef={ref}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      value={displayValue || ''}
      componentRef={textField}
    />
  );
});
MaskedTextField.displayName = COMPONENT_NAME;
