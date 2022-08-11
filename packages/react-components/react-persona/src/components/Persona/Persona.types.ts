import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type PersonaSlots = {
  root: Slot<'div'>;
};

/**
 * Persona Props
 */
export type PersonaProps = ComponentProps<PersonaSlots> & {};

/**
 * State used in rendering Persona
 */
export type PersonaState = ComponentState<PersonaSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from PersonaProps.
// & Required<Pick<PersonaProps, 'propName'>>
