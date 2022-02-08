import * as keys from '@fluentui/keyboard-keys';
import * as React from 'react';

/**
 * enum of actions available in any type of managed dropdown control
 * e.g. combobox, select, datepicker, menu
 */
export enum DropdownActions {
  Close,
  CloseSelect,
  First,
  Last,
  Next,
  None,
  Open,
  PageDown,
  PageUp,
  Previous,
  Select,
  Type,
}

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
    return DropdownActions.Type;
  }

  // handle opening the dropdown if closed
  if (!open) {
    if (code === keys.ArrowDown || code === keys.ArrowUp || code === keys.Enter || code === keys.Space) {
      return DropdownActions.Open;
    }

    // if the dropdown is closed and an action did not match the above, do nothing
    return DropdownActions.None;
  }

  // select or close actions
  if ((code === keys.ArrowUp && altKey) || code === keys.Enter || (!multiselect && code === keys.Space)) {
    return DropdownActions.CloseSelect;
  }
  if (code === keys.Tab || (multiselect && code === keys.Space)) {
    return DropdownActions.Select;
  }
  if (code === keys.Escape) {
    return DropdownActions.Close;
  }

  // navigation interactions
  if (code === keys.ArrowRight || code === keys.ArrowDown) {
    return DropdownActions.Next;
  }
  if (code === keys.ArrowLeft || code === keys.ArrowUp) {
    return DropdownActions.Previous;
  }
  if (code === keys.Home) {
    return DropdownActions.First;
  }
  if (code === keys.End) {
    return DropdownActions.Last;
  }
  if (code === keys.PageUp) {
    return DropdownActions.PageUp;
  }
  if (code === keys.PageDown) {
    return DropdownActions.PageDown;
  }

  // if nothing matched, return none
  return DropdownActions.None;
}

/**
 * Returns the requested option index from an action
 */
export function getIndexFromAction(action: DropdownActions, currentIndex: number, maxIndex: number): number {
  switch (action) {
    case DropdownActions.Next:
      return Math.min(maxIndex, currentIndex + 1);
      break;
    case DropdownActions.Previous:
      return Math.max(0, currentIndex - 1);
    case DropdownActions.First:
      return 0;
    case DropdownActions.Last:
      return maxIndex;
    case DropdownActions.PageDown:
      return Math.min(maxIndex, currentIndex + 10);
    case DropdownActions.PageUp:
      return Math.max(0, currentIndex - 10);
    // case DropdownActions.Type:
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
