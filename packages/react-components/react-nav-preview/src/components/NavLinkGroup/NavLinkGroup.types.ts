import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavLinkGroupSlots = {
  root: Slot<'div'>;
};

/**
 * NavLinkGroup Props
 */
export type NavLinkGroupProps = ComponentProps<NavLinkGroupSlots> & {};

/**
 * State used in rendering NavLinkGroup
 */
export type NavLinkGroupState = ComponentState<NavLinkGroupSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from NavLinkGroupProps.
// & Required<Pick<NavLinkGroupProps, 'propName'>>
