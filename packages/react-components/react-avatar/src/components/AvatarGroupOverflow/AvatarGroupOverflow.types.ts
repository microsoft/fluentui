import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type AvatarGroupOverflowSlots = {
  root: Slot<'div'>;
};

/**
 * AvatarGroupOverflow Props
 */
export type AvatarGroupOverflowProps = ComponentProps<AvatarGroupOverflowSlots> & {};

/**
 * State used in rendering AvatarGroupOverflow
 */
export type AvatarGroupOverflowState = ComponentState<AvatarGroupOverflowSlots>;
// & Required<Pick<AvatarGroupOverflowProps, 'propName'>>
