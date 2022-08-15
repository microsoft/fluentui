import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { SelectableHandler } from '../../../../react-menu/src/index';

export type ToolbarSlots = {
  root: Slot<'div'>;
};

export type ToolbarCheckedValueChangeData = {
  /** The items for this value that are checked */
  checkedItems: string[];
  /** The name of the value */
  name: string;
};

export type ToolbarCheckedValueChangeEvent = React.MouseEvent | React.KeyboardEvent;

/**
 * Toolbar Props
 */
export type ToolbarProps = ComponentProps<ToolbarSlots> & {
  /**
   * Toolbar can have small or medium size
   *
   * @default medium
   */
  size?: 'small' | 'medium';

  /**
   * Map of all checked values
   */
  checkedValues?: Record<string, string[]>;

  /**
   * Default values to be checked on mount
   */
  defaultCheckedValues?: Record<string, string[]>;

  /**
   * Callback when checked items change for value with a name
   *
   * @param event - React's original SyntheticEvent
   * @param data - A data object with relevant information
   */
  onCheckedValueChange?: (e: ToolbarCheckedValueChangeEvent, data: ToolbarCheckedValueChangeData) => void;
};

/**
 * State used in rendering Toolbar
 */
export type ToolbarState = ComponentState<ToolbarSlots> &
  Required<Pick<ToolbarProps, 'size' | 'checkedValues'>> &
  Pick<ToolbarProps, 'defaultCheckedValues' | 'onCheckedValueChange'> & {
    /*
     * Toggles the state of a ToggleButton item
     */
    handleToggleButton: SelectableHandler;
  };

export type ToolbarContextValue = Pick<ToolbarProps, 'size'> & {
  handleToggleButton?: SelectableHandler;
};

export type ToolbarContextValues = {
  toolbar: ToolbarContextValue;
};

export type UninitializedToolbarState = Omit<ToolbarState, 'checkedValues' | 'handleToggleButton'> &
  Partial<Pick<ToolbarState, 'checkedValues'>>;
