const DEFAULT_MASK_FORMAT_CHARS: { [key: string]: RegExp } = {
  '9': /[0-9]/,
  'a': /[a-zA-Z]/,
  '*': /[a-zA-Z0-9]/
};

/**
 * Takes in the mask string and the input value and returns what should be displayed in the input field;
 *
 * Takes
 * Example:
 * mask = 'Phone Number: (999) 999 - 9999'
 * value = '12345'
 * maskChar = '_'
 * return = 'Phone Number: (123) 45_ - ___'
 *
 * Example:
 * mask = 'Phone Number: (999) 999 - 9999'
 * value = '12345'
 * maskChar = undefined
 * return = 'Phone Number: (123) 45'
 *
 * @param mask The string use to define the format of the displayed maskedValue.
 * @param value The validated user unput to insert into the mask string for displaying.
 * @param maskChar? A character to display in place of unfilled mask format characters.
 * @param maskFormat An object defining how certain characters in the mask should accept input.
 *
 * @public
 */
export function getMaskDisplay(
  mask: string,
  value?: string,
  maskChar?: string,
  maskFormat: { [key: string]: RegExp } = DEFAULT_MASK_FORMAT_CHARS): string | undefined {

  let outputMask = '';
  let valueIndex = 0;

  for (let i = 0; i < mask.length; i++) {
    let c = mask.charAt(i);
    if (c === '\\') {
      // Escape next char
      if (++i < mask.length) {
        outputMask += mask.charAt(i);
      }
    } else {
      // Search for default format char
      const format = maskFormat[c];
      // Check if format exists
      if (format) {
        // Check for value char to correspond to mask character
        // Check if value character satisfies format
        if (value && valueIndex < value.length && format.test(value.charAt(valueIndex))) {
          outputMask += value.charAt(valueIndex++);
        } else {
          // Push maskChar or just return mask as-is
          if (maskChar) {
            outputMask += maskChar;
          } else {
            return outputMask;
          }
        }
      } else {
        // Otherwise, add non-format mask character
        outputMask += c;
      }
    }
  }

  return outputMask;
}

/**
 * Takes the mask string and what is displayed in the input field and returns the input value.
 *
 * Example: No input changes to the maskedValue
 * mask = 'Phone Number: (999) 999 - 9999'
 * maskedValue = 'Phone Number: (123) 45_ - ___'
 * return = '12345'
 *
 * Example: User typed '6' on the input
 * mask = 'Phone Number: (999) 999 - 9999'
 * maskedValue = 'Phone Number: (123) 456_ - ___' (note: The user entered a '6' between the '4' and '_')
 * return = '123456'
 *
 * Example: User deleted '5' on the input
 * mask = 'Phone Number: (999) 999 - 9999'
 * maskedValue = 'Phone Number: (123) 4_ - ___'
 * return = '1234'
 *
 * @param mask The string use to define the format of the displayed maskedValue.
 * @param maskedValue The displayed mask string after an input change.
 * @param cursorPositionCallback? A callback to move the input cursor to the start of the first unfilled mask format character.
 * @param maskFormat An object defining how certain characters in the mask should accept input.
 *
 * @return The parsed value from the mask and maskedValue
 *
 * @public
 */
export function getValueFromMaskDisplay(
  mask: string,
  maskedValue: string,
  cursorPositionCallback?: (index: number) => void,
  maskFormat: { [key: string]: RegExp } = DEFAULT_MASK_FORMAT_CHARS): string {

  let value = '';

  // Find the char difference between the mask and the value
  let valueIndex = 0;
  let maskIndex = 0;

  let escapeNext = false;
  // Count of characters skipped to reach next non-format mask character
  let skippedChars = 0;
  while (valueIndex < maskedValue.length && maskIndex < mask.length) {
    // Check for escaped characters and skip them
    if (mask.charAt(maskIndex) === '\\') {
      escapeNext = true;
      maskIndex++;
    } else {
      const formatExp = maskFormat[mask.charAt(maskIndex)];
      // If next character is not escaped and is a format character
      if (!escapeNext && formatExp) {
        let valueChar = maskedValue.charAt(valueIndex);
        // Check if the value does not match the format expression
        if (!formatExp.test(valueChar)) {
          cursorPositionCallback && cursorPositionCallback(valueIndex - skippedChars);
          return value;
        } else {
          value += valueChar;
        }
      } else {
        escapeNext = false;
        // Otherwise, character in mask string is normal prompt text
        // Skip characters in the maskedValue until you reach a character that matches the mask
        while (
          valueIndex < maskedValue.length &&
          maskedValue.charAt(valueIndex) !== mask.charAt(maskIndex)) {
          skippedChars++;
          valueIndex++;
        }
      }
      valueIndex++;
      maskIndex++;
    }
  }
  cursorPositionCallback && cursorPositionCallback(valueIndex);
  return value;
}
