import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utils';

export interface MenuListProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Callback when checked values change for a specific name
   */
  onCheckedValuesChange?: (name: string, value: string[]) => void;

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
