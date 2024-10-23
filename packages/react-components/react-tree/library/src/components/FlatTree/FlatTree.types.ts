import type { ComponentProps, ComponentState, SelectionMode } from '@fluentui/react-utilities';
import type {
  TreeSlots,
  TreeCheckedChangeData,
  TreeCheckedChangeEvent,
  TreeNavigationData_unstable,
  TreeNavigationEvent_unstable,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
  TreeSelectionValue,
} from '../Tree/index';
import type { TreeItemValue } from '../TreeItem/index';
import type { TreeContextValue } from '../../contexts';

export type FlatTreeSlots = TreeSlots;

export type FlatTreeContextValues = {
  tree: TreeContextValue;
};

export type FlatTreeProps = ComponentProps<TreeSlots> & {
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
   * This refers to a list of ids of opened tree items.
   * Controls the state of the open tree items.
   * These property is ignored for subtrees.
   */
  openItems?: Iterable<TreeItemValue>;
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
   * Callback fired when navigation happens inside the component.
   * These property is ignored for subtrees.
   *
   * FIXME: This method is not ideal, as navigation should be handled internally by tabster.
   *
   * @param event - a React's Synthetic event
   * @param data - A data object with relevant information,
   */
  onNavigation?(event: TreeNavigationEvent_unstable, data: TreeNavigationData_unstable): void;

  /**
   * This refers to the selection mode of the tree.
   * - undefined: No selection can be done.
   * - 'single': Only one tree item can be selected, radio buttons are rendered.
   * - 'multiselect': Multiple tree items can be selected, checkboxes are rendered.
   *
   * @default undefined
   */
  selectionMode?: SelectionMode;
  /**
   * This refers to a list of ids of checked tree items, or a list of tuples of ids and checked state.
   * Controls the state of the checked tree items.
   * These property is ignored for subtrees.
   */
  checkedItems?: Iterable<TreeItemValue | [TreeItemValue, TreeSelectionValue]>;
  /**
   * Callback fired when the component changes value from checked state.
   * These property is ignored for subtrees.
   *
   * @param event - a React's Synthetic event
   * @param data - A data object with relevant information,
   * such as checked value and type of interaction that created the event.
   */
  onCheckedChange?(event: TreeCheckedChangeEvent, data: TreeCheckedChangeData): void;
};

export type FlatTreeState = ComponentState<FlatTreeSlots> &
  TreeContextValue & {
    open: boolean;
  };
