import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type AvatarGroupSlots = {
  root: Slot<'div'>;
};

type AvatarGroupCommons = {
  // TODO Add things shared between props and state here
};

/**
 * AvatarGroup Props
 */
export type AvatarGroupProps = ComponentProps<AvatarGroupSlots> & AvatarGroupCommons;

/**
 * State used in rendering AvatarGroup
 */
export type AvatarGroupState = ComponentState<AvatarGroupSlots> & AvatarGroupCommons;
