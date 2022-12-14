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
  actions?: Slot<'span'>;
};

/**
 * TreeItem Props
 */
export type TreeItemProps = ComponentProps<Partial<TreeItemSlots>> &
  BaseTreeItemProps & {
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
  };

/**
 * State used in rendering TreeItem
 */
export type TreeItemState = ComponentState<TreeItemSlots> &
  BaseTreeItemState &
  Required<Pick<TreeItemProps, 'appearance' | 'size'>>;
