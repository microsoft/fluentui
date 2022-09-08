import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type PersonaPresenceBadgeSlots = {
  root: Slot<'div'>;
};

/**
 * PersonaPresenceBadge Props
 */
export type PersonaPresenceBadgeProps = ComponentProps<PersonaPresenceBadgeSlots> & {};

/**
 * State used in rendering PersonaPresenceBadge
 */
export type PersonaPresenceBadgeState = ComponentState<PersonaPresenceBadgeSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from PersonaPresenceBadgeProps.
// & Required<Pick<PersonaPresenceBadgeProps, 'propName'>>
