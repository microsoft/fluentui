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
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from PersonaAvatarProps.
// & Required<Pick<PersonaAvatarProps, 'propName'>>
