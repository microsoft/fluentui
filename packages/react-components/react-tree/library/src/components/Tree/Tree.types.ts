import type * as React from 'react';
import type { ComponentProps, ComponentState, SelectionMode, Slot } from '@fluentui/react-utilities';
import type { TreeContextValue, SubtreeContextValue } from '../../contexts';
import type { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, End, Enter, Home } from '@fluentui/keyboard-keys';
import type { TreeItemValue } from '../TreeItem/TreeItem.types';
import { CheckboxProps } from '@fluentui/react-checkbox';
import { RadioProps } from '@fluentui/react-radio';

type MultiSelectValue = NonNullable<CheckboxProps['checked']>;
type SingleSelectValue = NonNullable<RadioProps['checked']>;
export type TreeSelectionValue = MultiSelectValue | SingleSelectValue;

export type TreeSlots = {
  root: Slot<'div'>;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export type TreeNavigationData_unstable = {
  target: HTMLElement;
  value: TreeItemValue;
  parentValue: TreeItemValue | undefined;
} & (
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

export type TreeOpenChangeData = {
  open: boolean;
  openItems: Set<TreeItemValue>;
  value: TreeItemValue;
  target: HTMLElement;
} & (
  | { event: React.MouseEvent<HTMLElement>; type: 'ExpandIconClick' }
  | { event: React.MouseEvent<HTMLElement>; type: 'Click' }
  /**
   * @deprecated
   * Use `type: 'Click'` instead of Enter,
   * an enter press will trigger a click event, which will trigger an open change,
   * so there is no need to have a separate type for it.
   */
  | { event: React.KeyboardEvent<HTMLElement>; type: typeof Enter }
  | { event: React.KeyboardEvent<HTMLElement>; type: typeof ArrowRight }
  | { event: React.KeyboardEvent<HTMLElement>; type: typeof ArrowLeft }
);

/**
 * @internal
 *
 * To avoid breaking changes on TreeNavigationData
 * we are creating a new type that extends the old one
 * and adds the new methods, and this type will not be exported
 */
type TreeNavigationDataParam = TreeNavigationData_unstable & {
  preventScroll(): void;
  isScrollPrevented(): boolean;
};

export type TreeOpenChangeEvent = TreeOpenChangeData['event'];

export type TreeCheckedChangeData = {
  value: TreeItemValue;
  checkedItems: Map<TreeItemValue, TreeSelectionValue>;
  target: HTMLElement;
  event: React.ChangeEvent<HTMLElement>;
  type: 'Change';
} & (
  | {
      selectionMode: 'multiselect';
      checked: MultiSelectValue;
    }
  | {
      selectionMode: 'single';
      checked: SingleSelectValue;
    }
);

export type TreeCheckedChangeEvent = TreeCheckedChangeData['event'];

export type TreeContextValues = {
  tree: TreeContextValue | SubtreeContextValue;
};

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
   * This refers to a list of ids of opened tree items.
   * Controls the state of the open tree items.
   * These property is ignored for subtrees.
   */
  openItems?: Iterable<TreeItemValue>;
  /**
   * This refers to a list of ids of default opened items.
   * This property is ignored for subtrees.
   */
  defaultOpenItems?: Iterable<TreeItemValue>;
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
  onNavigation?(event: TreeNavigationEvent_unstable, data: TreeNavigationDataParam): void;

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

/**
 * State used in rendering Tree
 */
export type TreeState = ComponentState<TreeSlots> & {
  open: boolean;
} & (TreeContextValue | SubtreeContextValue);
