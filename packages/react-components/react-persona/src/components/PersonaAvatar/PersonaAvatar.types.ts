import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type PersonaAvatarSlots = {
  root: Slot<'div'>;
};

/**
 * PersonaAvatar Props
 */
export type PersonaAvatarProps = ComponentProps<PersonaAvatarSlots> & {};

/**
 * State used in rendering PersonaAvatar
 */
export type PersonaAvatarState = ComponentState<PersonaAvatarSlots>;
// & Required<Pick<PersonaAvatarProps, 'propName'>>
