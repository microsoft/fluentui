import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type PersonaIconSlots = {
  root: Slot<'div'>;
};

/**
 * PersonaIcon Props
 */
export type PersonaIconProps = ComponentProps<PersonaIconSlots> & {};

/**
 * State used in rendering PersonaIcon
 */
export type PersonaIconState = ComponentState<PersonaIconSlots>;
// & Required<Pick<PersonaIconProps, 'propName'>>
