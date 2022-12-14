import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type FoobarSlots = {
  root: Slot<'div'>;
};

/**
 * Foobar Props
 */
export type FoobarProps = ComponentProps<FoobarSlots> & {};

/**
 * State used in rendering Foobar
 */
export type FoobarState = ComponentState<FoobarSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from FoobarProps.
// & Required<Pick<FoobarProps, 'propName'>>
