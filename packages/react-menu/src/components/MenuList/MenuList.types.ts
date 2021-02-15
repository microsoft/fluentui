import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utils';

export interface MenuListProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
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
}

export interface MenuListState extends MenuListProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
}
