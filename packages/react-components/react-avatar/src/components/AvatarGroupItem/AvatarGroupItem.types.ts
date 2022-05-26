import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type AvatarGroupItemSlots = {
  root: Slot<'div'>;
};

/**
 * AvatarGroupItem Props
 */
export type AvatarGroupItemProps = ComponentProps<AvatarGroupItemSlots> & {};

/**
 * State used in rendering AvatarGroupItem
 */
export type AvatarGroupItemState = ComponentState<AvatarGroupItemSlots>;
