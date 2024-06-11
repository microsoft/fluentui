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
  | 'Tab'
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
  if (multiselect && code === keys.Space) {
    return 'Select';
  }
  if (code === keys.Escape) {
    return 'Close';
  }

  // navigation interactions
  if (code === keys.ArrowDown) {
    return 'Next';
  }
  if (code === keys.ArrowUp) {
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
  if (code === keys.Tab) {
    return 'Tab';
  }

  // if nothing matched, return none
  return 'None';
}
