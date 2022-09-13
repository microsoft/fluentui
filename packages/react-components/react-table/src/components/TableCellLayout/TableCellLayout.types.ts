import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TableCellLayoutSlots = {
  root: Slot<'div'>;

  media?: Slot<'span'>;
};

/**
 * TableCellLayout Props
 */
export type TableCellLayoutProps = ComponentProps<TableCellLayoutSlots> & {};

/**
 * State used in rendering TableCellLayout
 */
export type TableCellLayoutState = ComponentState<TableCellLayoutSlots>;
