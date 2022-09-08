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
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from PersonaIconProps.
// & Required<Pick<PersonaIconProps, 'propName'>>
