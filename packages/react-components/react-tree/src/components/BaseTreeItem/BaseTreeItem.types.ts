import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ARIAButtonElement, ARIAButtonElementIntersection, ARIAButtonSlotProps } from '@fluentui/react-aria';

export type BaseTreeItemElement = ARIAButtonElement;

/** @internal */
export type BaseTreeItemElementIntersection = ARIAButtonElementIntersection;

export type BaseTreeItemSlots = {
  /**
   * BaseTreeItem root wraps around `props.content`
   */
  root: Slot<ARIAButtonSlotProps>;
};

/**
 * BaseTreeItem Props
 */
export type BaseTreeItemProps = ComponentProps<BaseTreeItemSlots>;

/**
 * State used in rendering BaseTreeItem
 */
export type BaseTreeItemState = ComponentState<BaseTreeItemSlots> & {
  open: boolean;
  isLeaf: boolean;
};
