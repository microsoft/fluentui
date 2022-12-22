import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import {
  BaseTreeItemElement,
  BaseTreeItemElementIntersection,
  BaseTreeItemProps,
  BaseTreeItemSlots,
  BaseTreeItemState,
} from '../BaseTreeItem/index';

export type TreeItemElement = BaseTreeItemElement;

/** @internal */
export type TreeItemElementIntersection = BaseTreeItemElementIntersection;

export type TreeItemSlots = BaseTreeItemSlots & {
  /**
   * Expand icon slot,
   * by default renders a chevron icon to indicate opening and closing
   */
  expandIcon?: Slot<'span'>;
  /**
   * Icon slot that renders right before main content
   */
  iconBefore?: Slot<'span'>;
  /**
   * Icon slot that renders right after main content
   */
  iconAfter?: Slot<'span'>;
  /**
   * Actions slot that renders on the end of tree item
   */
  badges?: Slot<'span'>;
  /**
   * Actions slot that renders on the end of tree item
   * when the item is hovered/focused
   */
  actions?: Slot<'span'>;
};

/**
 * TreeItem Props
 */
export type TreeItemProps = ComponentProps<Partial<TreeItemSlots>> & BaseTreeItemProps;

/**
 * State used in rendering TreeItem
 */
export type TreeItemState = ComponentState<TreeItemSlots> & BaseTreeItemState;
