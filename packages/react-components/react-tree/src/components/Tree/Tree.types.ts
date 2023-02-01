import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TreeContextValue } from '../../contexts/treeContext';

export type TreeSlots = {
  root: Slot<'div'>;
};

export type TreeOpenChangeData = { open: boolean } & (
  | {
      event: React.MouseEvent<HTMLElement>;
      type: 'expandIconClick';
    }
  | {
      event: React.MouseEvent<HTMLElement>;
      type: 'click';
    }
  | {
      event: React.KeyboardEvent<HTMLElement>;
      type: 'enter';
    }
  | {
      event: React.KeyboardEvent<HTMLElement>;
      type: 'arrowRight';
    }
  | {
      event: React.KeyboardEvent<HTMLElement>;
      type: 'arrowLeft';
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
   * This refers to a list of ids of opened tree items.
   * Controls the state of the open tree items.
   * These property is ignored for subtrees.
   */
  openItems?: string | string[];
  /**
   * This refers to a list of ids of opened tree items.
   * Default value for the uncontrolled state of open tree items.
   * These property is ignored for subtrees.
   */
  defaultOpenItems?: string | string[];
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
export type TreeState = ComponentState<TreeSlots> & TreeContextValue;
