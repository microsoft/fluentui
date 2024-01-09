import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TableSwatchSlots = {
  root: Slot<'td'>;
  button?: Slot<'button'>;
};

/**
 * TableSwatch Props
 */
export type TableSwatchProps = ComponentProps<TableSwatchSlots> & {
  value?: string;
  selected?: boolean;
};

/**
 * State used in rendering TableSwatch
 */
export type TableSwatchState = ComponentState<TableSwatchSlots> & Pick<TableSwatchProps, 'value' | 'selected'>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from TableSwatchProps.
// & Required<Pick<TableSwatchProps, 'propName'>>
