export interface IMaskValue {
  value?: string;
  /**
   * This index refers to the index in the displayMask rather than the inputMask.
   * This means that any escaped characters do not count toward this index.
   */
  displayIndex: number;
  format: RegExp;
}

export const DEFAULT_MASK_FORMAT_CHARS: { [key: string]: RegExp } = {
  '9': /[0-9]/,
  a: /[a-zA-Z]/,
  '*': /[a-zA-Z0-9]/,
};

/**
 * Takes in the mask string and the formatCharacters and returns an array of MaskValues
 * Example:
 * mask = 'Phone Number: (999) - 9999'
 * return = [
 *    { value: undefined, displayIndex: 16, format: /[0-9]/ },
 *    { value: undefined, displayIndex: 17, format: /[0-9]/ },
 *    { value: undefined, displayIndex: 18, format: /[0-9]/ },
 *    { value: undefined, displayIndex: 22, format: /[0-9]/ },
 * ]
 *
 * @param mask The string use to define the format of the displayed maskedValue.
 * @param formatChars An object defining how certain characters in the mask should accept input.
 */
export function parseMask(
  mask: string | undefined,
  formatChars: { [key: string]: RegExp } = DEFAULT_MASK_FORMAT_CHARS,
): IMaskValue[] {
  if (!mask) {
    return [];
  }

  const maskCharData: IMaskValue[] = [];
  // Count the escape characters in the mask string.
  let escapedChars = 0;
  for (let i = 0; i + escapedChars < mask.length; i++) {
    const maskChar = mask.charAt(i + escapedChars);
    if (maskChar === '\\') {
      escapedChars++;
    } else {
      // Check if the maskChar is a format character.
      const maskFormat = formatChars[maskChar];
      if (maskFormat) {
        maskCharData.push({
          /**
           * Do not add escapedChars to the displayIndex.
           * The index refers to a position in the mask's displayValue.
           * Since the backslashes don't appear in the displayValue,
           * we do not add them to the charData displayIndex.
           */
          displayIndex: i,
          format: maskFormat,
        });
      }
    }
  }

  return maskCharData;
}

/**
 * Takes in the mask string, an array of MaskValues, and the maskCharacter
 * returns the mask string formatted with the input values and maskCharacter.
 * If the maskChar is undefined, the maskDisplay is truncated to the last filled format character.
 * Example:
 * mask = 'Phone Number: (999) 999 - 9999'
 * maskCharData = '12345'
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
 * @param maskCharData The input values to insert into the mask string for displaying.
 * @param maskChar? A character to display in place of unfilled mask format characters.
 */
export function getMaskDisplay(mask: string | undefined, maskCharData: IMaskValue[], maskChar?: string): string {
  let maskDisplay = mask;

  if (!maskDisplay) {
    return '';
  }

  // Remove all backslashes
  maskDisplay = maskDisplay.replace(/\\/g, '');

  // lastDisplayIndex is is used to truncate the string if necessary.
  let lastDisplayIndex = 0;
  if (maskCharData.length > 0) {
    lastDisplayIndex = maskCharData[0].displayIndex - 1;
  }

  /**
   * For each input value, replace the character in the maskDisplay with the value.
   * If there is no value set for the format character, use the maskChar.
   */
  for (const charData of maskCharData) {
    let nextChar = ' ';
    if (charData.value) {
      nextChar = charData.value;
      if (charData.displayIndex > lastDisplayIndex) {
        lastDisplayIndex = charData.displayIndex;
      }
    } else {
      if (maskChar) {
        nextChar = maskChar;
      }
    }

    // Insert the character into the maskdisplay at its corresponding index
    maskDisplay = maskDisplay.slice(0, charData.displayIndex) + nextChar + maskDisplay.slice(charData.displayIndex + 1);
  }

  // Cut off all mask characters after the last filled format value
  if (!maskChar) {
    maskDisplay = maskDisplay.slice(0, lastDisplayIndex + 1);
  }

  return maskDisplay;
}

/**
 * Get the next format index right of or at a specified index.
 * If no index exists, returns the rightmost index.
 * @param maskCharData
 * @param index
 */
export function getRightFormatIndex(maskCharData: IMaskValue[], index: number): number {
  for (let i = 0; i < maskCharData.length; i++) {
    if (maskCharData[i].displayIndex >= index) {
      return maskCharData[i].displayIndex;
    }
  }
  return maskCharData[maskCharData.length - 1].displayIndex;
}

/**
 * Get the next format index left of a specified index.
 * If no index exists, returns the leftmost index.
 * @param maskCharData
 * @param index
 */
export function getLeftFormatIndex(maskCharData: IMaskValue[], index: number): number {
  for (let i = maskCharData.length - 1; i >= 0; i--) {
    if (maskCharData[i].displayIndex < index) {
      return maskCharData[i].displayIndex;
    }
  }
  return maskCharData[0].displayIndex;
}

/**
 * Deletes all values in maskCharData with a displayIndex that falls inside the specified range.
 * maskCharData is modified inline and also returned.
 * @param maskCharData
 * @param selectionStart
 * @param selectionCount
 */
export function clearRange(maskCharData: IMaskValue[], selectionStart: number, selectionCount: number): IMaskValue[] {
  for (let i = 0; i < maskCharData.length; i++) {
    if (maskCharData[i].displayIndex >= selectionStart) {
      if (maskCharData[i].displayIndex >= selectionStart + selectionCount) {
        break;
      }
      maskCharData[i].value = undefined;
    }
  }
  return maskCharData;
}

/**
 * Deletes the input character at or after a specified index and returns the new array of charData
 * maskCharData is modified inline and also returned.
 * @param maskCharData
 * @param selectionStart
 */
export function clearNext(maskCharData: IMaskValue[], selectionStart: number): IMaskValue[] {
  for (let i = 0; i < maskCharData.length; i++) {
    if (maskCharData[i].displayIndex >= selectionStart) {
      maskCharData[i].value = undefined;
      break;
    }
  }
  return maskCharData;
}

/**
 * Deletes the input character before a specified index and returns the new array of charData
 * maskCharData is modified inline and also returned.
 * @param maskCharData
 * @param selectionStart
 */
export function clearPrev(maskCharData: IMaskValue[], selectionStart: number): IMaskValue[] {
  for (let i = maskCharData.length - 1; i >= 0; i--) {
    if (maskCharData[i].displayIndex < selectionStart) {
      maskCharData[i].value = undefined;
      break;
    }
  }
  return maskCharData;
}

/**
 * Deletes all values in maskCharData with a displayIndex that falls inside the specified range.
 * Modifies the maskCharData inplace with the passed string and returns the display index of the
 * next format character after the inserted string.
 * @param maskCharData
 * @param selectionStart
 * @param selectionCount
 * @return The displayIndex of the next format character
 */
export function insertString(maskCharData: IMaskValue[], selectionStart: number, newString: string): number {
  let stringIndex = 0;
  let nextIndex = 0;
  let isStringInserted = false;

  // Iterate through _maskCharData finding values with a displayIndex after the specified range start
  for (let i = 0; i < maskCharData.length && stringIndex < newString.length; i++) {
    if (maskCharData[i].displayIndex >= selectionStart) {
      isStringInserted = true;
      nextIndex = maskCharData[i].displayIndex;
      // Find the next character in the newString that matches the format
      while (stringIndex < newString.length) {
        // If the character matches the format regexp, set the maskCharData to the new character
        if (maskCharData[i].format.test(newString.charAt(stringIndex))) {
          maskCharData[i].value = newString.charAt(stringIndex++);
          // Set the nextIndex to the display index of the next mask format character.
          if (i + 1 < maskCharData.length) {
            nextIndex = maskCharData[i + 1].displayIndex;
          } else {
            nextIndex++;
          }
          break;
        }
        stringIndex++;
      }
    }
  }

  return isStringInserted ? nextIndex : selectionStart;
}
