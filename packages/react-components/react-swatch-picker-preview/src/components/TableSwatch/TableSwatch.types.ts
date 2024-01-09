import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TableSwatchSlots = {
  root: Slot<'div'>;
};

/**
 * TableSwatch Props
 */
export type TableSwatchProps = ComponentProps<TableSwatchSlots> & {};

/**
 * State used in rendering TableSwatch
 */
export type TableSwatchState = ComponentState<TableSwatchSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from TableSwatchProps.
// & Required<Pick<TableSwatchProps, 'propName'>>
