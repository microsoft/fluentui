import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DrawerSlots = {
  root: Slot<'div'>;
};

/**
 * Drawer Props
 */
export type DrawerProps = ComponentProps<DrawerSlots> & {};

/**
 * State used in rendering Drawer
 */
export type DrawerState = ComponentState<DrawerSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from DrawerProps.
// & Required<Pick<DrawerProps, 'propName'>>
