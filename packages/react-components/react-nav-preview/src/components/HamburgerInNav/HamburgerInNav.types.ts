import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type HamburgerInNavSlots = {
  root: Slot<'div'>;
};

/**
 * HamburgerInNav Props
 */
export type HamburgerInNavProps = ComponentProps<HamburgerInNavSlots> & {};

/**
 * State used in rendering HamburgerInNav
 */
export type HamburgerInNavState = ComponentState<HamburgerInNavSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from HamburgerInNavProps.
// & Required<Pick<HamburgerInNavProps, 'propName'>>
