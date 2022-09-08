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
// & Required<Pick<PersonaPresenceBadgeProps, 'propName'>>
