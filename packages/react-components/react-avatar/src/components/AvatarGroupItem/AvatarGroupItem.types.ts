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
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from AvatarGroupItemProps.
// & Required<Pick<AvatarGroupItemProps, 'propName'>>
