import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavLinkSlots = {
  root: Slot<'div'>;
};

/**
 * NavLink Props
 */
export type NavLinkProps = ComponentProps<NavLinkSlots> & {};

/**
 * State used in rendering NavLink
 */
export type NavLinkState = ComponentState<NavLinkSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from NavLinkProps.
// & Required<Pick<NavLinkProps, 'propName'>>
