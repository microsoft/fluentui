import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavSlots = {
  root: Slot<'div'>;
};

/**
 * Nav Props
 */
export type NavProps = ComponentProps<NavSlots> & {};

/**
 * State used in rendering Nav
 */
export type NavState = ComponentState<NavSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from NavProps.
// & Required<Pick<NavProps, 'propName'>>
