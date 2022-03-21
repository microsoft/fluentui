import * as keys from '@fluentui/keyboard-keys';
import * as React from 'react';

/**
 * enum of actions available in any type of managed dropdown control
 * e.g. combobox, select, datepicker, menu
 */
export type DropdownActions =
  | 'Close'
  | 'CloseSelect'
  | 'First'
  | 'Last'
  | 'Next'
  | 'None'
  | 'Open'
  | 'PageDown'
  | 'PageUp'
  | 'Previous'
  | 'Select'
  | 'Type';

export interface DropdownActionOptions {
  open?: boolean;
  multiselect?: boolean;
}

/**
 * Converts a keyboard interaction into a defined action
 */
export function getDropdownActionFromKey(
  e: KeyboardEvent | React.KeyboardEvent,
  options: DropdownActionOptions = {},
): DropdownActions {
  const { open = true, multiselect = false } = options;
  const code = e.key;
  const { altKey, ctrlKey, key, metaKey } = e;

  // typing action occurs whether open or closed
  if (key.length === 1 && code !== keys.Space && !altKey && !ctrlKey && !metaKey) {
    return 'Type';
  }

  // handle opening the dropdown if closed
  if (!open) {
    if (code === keys.ArrowDown || code === keys.ArrowUp || code === keys.Enter || code === keys.Space) {
      return 'Open';
    }

    // if the dropdown is closed and an action did not match the above, do nothing
    return 'None';
  }

  // select or close actions
  if ((code === keys.ArrowUp && altKey) || code === keys.Enter || (!multiselect && code === keys.Space)) {
    return 'CloseSelect';
  }
  if (code === keys.Tab || (multiselect && code === keys.Space)) {
    return 'Select';
  }
  if (code === keys.Escape) {
    return 'Close';
  }

  // navigation interactions
  if (code === keys.ArrowRight || code === keys.ArrowDown) {
    return 'Next';
  }
  if (code === keys.ArrowLeft || code === keys.ArrowUp) {
    return 'Previous';
  }
  if (code === keys.Home) {
    return 'First';
  }
  if (code === keys.End) {
    return 'Last';
  }
  if (code === keys.PageUp) {
    return 'PageUp';
  }
  if (code === keys.PageDown) {
    return 'PageDown';
  }

  // if nothing matched, return none
  return 'None';
}

/**
 * Returns the requested option index from an action
 */
export function getIndexFromAction(action: DropdownActions, currentIndex: number, maxIndex: number): number {
  switch (action) {
    case 'Next':
      return Math.min(maxIndex, currentIndex + 1);
      break;
    case 'Previous':
      return Math.max(0, currentIndex - 1);
    case 'First':
      return 0;
    case 'Last':
      return maxIndex;
    case 'PageDown':
      return Math.min(maxIndex, currentIndex + 10);
    case 'PageUp':
      return Math.max(0, currentIndex - 10);
    // case 'Type':
    //   // always prevent default and stop propagation when typing
    //   e.preventDefault();
    //   e.stopPropagation();

    //   const matchingIndex = findByCharacter(e.key);
    //   return matchingIndex > -1 ? matchingIndex : activeIndex;
    //   break;
    default:
      return currentIndex;
  }
}
