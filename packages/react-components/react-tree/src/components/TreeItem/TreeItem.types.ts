import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ARIAButtonElement, ARIAButtonElementIntersection, ARIAButtonSlotProps } from '@fluentui/react-aria';

export type TreeItemElement = ARIAButtonElement<'div' | 'a'>;

/** @internal */
export type TreeItemElementIntersection = ARIAButtonElementIntersection<'div' | 'a'>;

export type TreeItemSlots = {
  /**
   * TreeItem root wraps around `props.content`
   */
  root: NonNullable<Slot<ARIAButtonSlotProps<'div' | 'a'>>>;
};

/**
 * TreeItem Props
 */
export type TreeItemProps = ComponentProps<TreeItemSlots>;

/**
 * State used in rendering TreeItem
 */
export type TreeItemState = ComponentState<TreeItemSlots>;
