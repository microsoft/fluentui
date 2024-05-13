import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type HamburgerSlots = {
  root: Slot<'div'>;
};

/**
 * Hamburger Props
 */
export type HamburgerProps = ComponentProps<HamburgerSlots> & {};

/**
 * State used in rendering Hamburger
 */
export type HamburgerState = ComponentState<HamburgerSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from HamburgerProps.
// & Required<Pick<HamburgerProps, 'propName'>>
