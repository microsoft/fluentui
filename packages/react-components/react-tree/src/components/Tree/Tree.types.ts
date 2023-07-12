import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TreeContextValue } from '../../contexts/treeContext';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, End, Enter, Home, Space } from '@fluentui/keyboard-keys';
import { TreeItemValue } from '../../TreeItem';

export type TreeSlots = {
  root: Slot<'div'>;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export type TreeNavigationData_unstable = { target: HTMLElement; value: string } & (
  | { event: React.MouseEvent<HTMLElement>; type: 'Click' }
  | { event: React.KeyboardEvent<HTMLElement>; type: 'TypeAhead' }
  | { event: React.KeyboardEvent<HTMLElement>; type: typeof ArrowRight }
  | { event: React.KeyboardEvent<HTMLElement>; type: typeof ArrowLeft }
  | { event: React.KeyboardEvent<HTMLElement>; type: typeof ArrowUp }
  | { event: React.KeyboardEvent<HTMLElement>; type: typeof ArrowDown }
  | { event: React.KeyboardEvent<HTMLElement>; type: typeof Home }
  | { event: React.KeyboardEvent<HTMLElement>; type: typeof End }
);

// eslint-disable-next-line @typescript-eslint/naming-convention
export type TreeNavigationEvent_unstable = TreeNavigationData_unstable['event'];

export type TreeOpenChangeData = { open: boolean; value: string } & (
  | {
      event: React.MouseEvent<HTMLElement>;
      target: HTMLElement;
      type: 'ExpandIconClick';
    }
  | {
      event: React.MouseEvent<HTMLElement>;
      target: HTMLElement;
      type: 'Click';
    }
  | {
      event: React.KeyboardEvent<HTMLElement>;
      target: HTMLElement;
      type: typeof Enter;
    }
  | {
      event: React.KeyboardEvent<HTMLElement>;
      target: HTMLElement;
      type: typeof ArrowRight;
    }
  | {
      event: React.KeyboardEvent<HTMLElement>;
      target: HTMLElement;
      type: typeof ArrowLeft;
    }
);

export type TreeSelectionChangeData = {
  value: TreeItemValue;
  target: HTMLElement;
  event: React.ChangeEvent<HTMLElement>;
  type: 'Change';
} & (
  | {
      event: React.MouseEvent<HTMLElement>;
      target: HTMLElement;
      type: 'SelectionIconClick';
    }
  | {
      event: React.KeyboardEvent<HTMLElement>;
      target: HTMLElement;
      type: typeof Space;
    }
);

export type TreeCheckedChangeEvent = TreeSelectionChangeData['event'];

export type TreeOpenChangeEvent = TreeOpenChangeData['event'];

export type TreeContextValues = {
  tree: TreeContextValue;
};

export type TreeSelectionValues = 'none' | 'checkbox' | 'radio';

export type TreeProps = ComponentProps<TreeSlots> & {
  /**
   * A tree item can have various appearances:
   * - 'subtle' (default): The default tree item styles.
   * - 'subtle-alpha': Minimizes emphasis on hovered or focused states.
   * - 'transparent': Removes background color.
   * @default 'subtle'
   */
  appearance?: 'subtle' | 'subtle-alpha' | 'transparent';
  /**
   * Size of the tree item.
   * @default 'medium'
   */
  size?: 'small' | 'medium';
  /**
   * A tree can have three kinds of selection modes.
   * @default 'none'
   */
  selection?: TreeSelectionValues;
  /**
   * This refers to a list of ids of opened tree items.
   * Controls the state of the open tree items.
   * These property is ignored for subtrees.
   */
  openItems?: Iterable<string>;
  /**
   * This refers to a list of ids of opened tree items.
   * Default value for the uncontrolled state of open tree items.
   * These property is ignored for subtrees.
   */
  defaultOpenItems?: Iterable<string>;
  /**
   * This refers to a list of ids of selected tree items.
   * Controls the state of the selected tree items.
   * These property is ignored for subtrees.
   */
  selectedItems?: Iterable<string | [string, 'mixed' | boolean]>;
  /**
   * This refers to a list of ids of selected tree items.
   * These property is ignored for subtrees.
   */
  defaultSelectedItems?: Iterable<string | [string, 'mixed' | boolean]>;
  /**
   * Callback fired when the component changes value from open state.
   * These property is ignored for subtrees.
   *
   * @param event - a React's Synthetic event
   * @param data - A data object with relevant information,
   * such as open value and type of interaction that created the event.
   */
  onOpenChange?(event: TreeOpenChangeEvent, data: TreeOpenChangeData): void;
  /**
   * Callback fired when the component's item changes value from un/selected state.
   *
   * @param event - a React's mouse/keyboard event
   * @param data - A data object with relevant information,
   * such as open value and type of interaction that created the event.
   */
  onSelectionChange?: (event: TreeCheckedChangeEvent, data: TreeSelectionChangeData) => void;
  /**
   * Callback fired when navigation happens inside the component.
   * These property is ignored for subtrees.
   *
   * FIXME: This method is not ideal, as navigation should be handled internally by tabster.
   *
   * @param event - a React's Synthetic event
   * @param data - A data object with relevant information,
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  onNavigation_unstable?(event: TreeNavigationEvent_unstable, data: TreeNavigationData_unstable): void;
};

/**
 * State used in rendering Tree
 */
export type TreeState = ComponentState<TreeSlots> &
  TreeContextValue & {
    open: boolean;
  };
