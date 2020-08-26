import * as React from 'react';
import { TextField } from '../TextField';
import { ITextField, ITextFieldProps } from '../TextField.types';
import { KeyCodes, IRefObject } from '../../../Utilities';
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
  parseMask,
} from './inputMask';
import { useConst, usePrevious } from '@uifabric/react-hooks';

export interface IMaskedTextFieldState {
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
  componentRef: IRefObject<ITextField> | undefined,
  maskCharData: IMaskValue[],
  textField: React.RefObject<ITextField>,
  setValue: (newValue: string) => void,
) => {
  React.useImperativeHandle(
    componentRef,
    () => ({
      /**
       * @returns The value of all filled format characters or undefined if not all format characters are filled
       */
      get value(): string | undefined {
        let value = '';

        for (let i = 0; i < maskCharData.length; i++) {
          if (!maskCharData[i].value) {
            return undefined;
          }
          value += maskCharData[i].value;
        }
        return value;
      },

      get selectionStart(): number | null {
        return textField.current && textField.current.selectionStart !== null ? textField.current.selectionStart : -1;
      },

      get selectionEnd(): number | null {
        return textField.current?.selectionEnd ? textField.current?.selectionEnd : -1;
      },

      setValue(newValue: string): void {
        return setValue(newValue);
      },

      focus(): void {
        textField.current?.focus?.();
      },

      blur(): void {
        textField.current?.blur?.();
      },

      select(): void {
        textField.current?.select?.();
      },

      setSelectionStart(value: number): void {
        textField.current?.setSelectionStart?.(value);
      },

      setSelectionEnd(value: number): void {
        textField.current?.setSelectionEnd?.(value);
      },

      setSelectionRange(start: number, end: number): void {
        textField.current?.setSelectionRange?.(start, end);
      },
    }),
    [maskCharData, setValue, textField],
  );
};

export const DEFAULT_MASK_CHAR = '_';

export const MaskedTextField = React.forwardRef<HTMLDivElement, ITextFieldProps>((props, ref) => {
  const textField = React.useRef<ITextField>(null);
  // const mergedRefs = useMergedRefs(textField, ref);

  const {
    componentRef,
    value,
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
  } = props;

  const internalState = useConst<IMaskedTextFieldState>(() => ({
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
  const [displayValue, setDisplayValue] = React.useState<string>(
    getMaskDisplay(mask, internalState.maskCharData, maskChar),
  );

  const setValue = (newValue: string): void => {
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
  };

  const handleFocus = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onFocus?.(event);
      internalState.isFocused = true;

      // Move the cursor position to the leftmost unfilled position
      for (let i = 0; i < internalState.maskCharData.length; i++) {
        if (!internalState.maskCharData[i].value) {
          setMaskCursorPosition(internalState.maskCharData[i].displayIndex);
          break;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onFocus],
  );

  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onBlur?.(event);
      internalState.isFocused = false;
      internalState.moveCursorOnMouseUp = true;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onBlur],
  );

  const handleMouseDown = React.useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      onMouseDown?.(event);
      if (!internalState.isFocused) {
        internalState.moveCursorOnMouseUp = true;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onMouseDown],
  );

  const handleMouseUp = React.useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      onMouseUp?.(event);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onMouseUp],
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [displayValue.length, mask, maskChar, onChange],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { current } = textField;
      onKeyDown?.(event);

      internalState.changeSelectionData = null;
      if (current && current.value) {
        const { keyCode, ctrlKey, metaKey } = event;

        // Ignore ctrl and meta keydown
        if (ctrlKey || metaKey) {
          return;
        }

        // On backspace or delete, store the selection and the keyCode
        if (keyCode === KeyCodes.backspace || keyCode === KeyCodes.del) {
          const selectionStart = (event.target as HTMLInputElement).selectionStart;
          const selectionEnd = (event.target as HTMLInputElement).selectionEnd;

          // Check if backspace or delete press is valid.
          if (
            !(keyCode === KeyCodes.backspace && selectionEnd && selectionEnd > 0) &&
            !(keyCode === KeyCodes.del && selectionStart !== null && selectionStart < current.value.length)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onKeyDown],
  );

  const handlePaste = React.useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>) => {
      onPaste?.(event);

      const selectionStart = (event.target as HTMLInputElement).selectionStart;
      const selectionEnd = (event.target as HTMLInputElement).selectionEnd;
      // Store the paste selection range
      internalState.changeSelectionData = {
        changeType: 'textPasted',
        selectionStart: selectionStart !== null ? selectionStart : -1,
        selectionEnd: selectionEnd !== null ? selectionEnd : -1,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onPaste],
  );

  const previousProps = usePrevious(props);

  React.useEffect(() => {
    if (mask !== previousProps?.mask || value !== previousProps?.value) {
      internalState.maskCharData = parseMask(mask, maskFormat);
      value !== undefined && setValue(value);
      setDisplayValue(getMaskDisplay(mask, internalState.maskCharData, maskChar));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mask, maskChar, maskFormat, value, setValue]);

  React.useEffect(() => {
    // Move the cursor to the start of the mask format on update
    if (internalState.isFocused && maskCursorPosition !== undefined && textField.current) {
      textField.current.setSelectionRange(maskCursorPosition, maskCursorPosition);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maskCursorPosition]);

  React.useEffect(() => {
    value !== undefined && setValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useComponentRef(componentRef, internalState.maskCharData, textField, setValue);

  return (
    <TextField
      {...props}
      elementRef={ref}
      componentRef={textField}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      value={displayValue || ''}
    />
  );
});
MaskedTextField.displayName = COMPONENT_NAME;
