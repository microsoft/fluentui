import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';
import { DropdownListContextValue } from '../../contexts/dropdownListContext';

export interface DropdownListProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Callback when checked items change for value with a name
   *
   * @param name - the name of the value
   * @param checkedItems - the items for this value that are checked
   */
  onCheckedValueChange?: (e: React.MouseEvent | React.KeyboardEvent, name: string, checkedItems: string[]) => void;

  /**
   * Map of all checked values
   */
  checkedValues?: Record<string, string[]>;

  /**
   * Default values to be checked on mount
   */
  defaultCheckedValues?: Record<string, string[]>;
}

export interface DropdownListState extends DropdownListProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;

  /**
   * Callback to set focus on the next option by first character
   */
  setFocusByFirstCharacter: DropdownListContextValue['setFocusByFirstCharacter'];
}
