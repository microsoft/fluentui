import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { BaseTreeItemElement } from '../BaseTreeItem/BaseTreeItem.types';
import { TreeContextValue } from '../../contexts/treeContext';

export type TreeSlots = {
  root: Slot<'div'>;
};

export type TreeOpenChangeData = { open: boolean; id: string } & (
  | {
      event: React.MouseEvent<BaseTreeItemElement>;
      type: 'expandIconClick';
    }
  | {
      event: React.MouseEvent<BaseTreeItemElement>;
      type: 'click';
    }
  | {
      event: React.KeyboardEvent<BaseTreeItemElement>;
      type: 'arrowRight' | 'arrowLeft';
    }
);

export type TreeOpenChangeEvent = TreeOpenChangeData['event'];

export type TreeContextValues = {
  tree: TreeContextValue;
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
   * Controls the state of the open subtrees.
   * These property is ignored for subtrees.
   */
  openSubtrees?: string | string[];
  /**
   * Default value for the uncontrolled state of open subtrees.
   * These property is ignored for subtrees.
   */
  defaultOpenSubtrees?: string | string[];
  /**
   * Callback fired when the component changes value from open state.
   * These property is ignored for subtrees.
   *
   * @param event - a React's Synthetic event
   * @param data - A data object with relevant information,
   * such as open value and type of interaction that created the event
   * and the id of the subtree that is being opened/closed
   */
  onOpenChange?(event: TreeOpenChangeEvent, data: TreeOpenChangeData): void;
};

/**
 * State used in rendering Tree
 */
export type TreeState = ComponentState<TreeSlots> &
  TreeContextValue & {
    open: boolean;
  };
