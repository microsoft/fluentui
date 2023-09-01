import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ListSlots = {
  root: Slot<'div'>;
};

/**
 * List Props
 */
export type ListProps = ComponentProps<ListSlots> & {};

/**
 * State used in rendering List
 */
export type ListState = ComponentState<ListSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from ListProps.
// & Required<Pick<ListProps, 'propName'>>
