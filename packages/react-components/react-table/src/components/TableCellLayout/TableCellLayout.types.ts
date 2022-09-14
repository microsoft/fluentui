import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TableCellLayoutSlots = {
  root: Slot<'div'>;

  media: Slot<'span'>;

  main: Slot<'span'>;

  description: Slot<'span'>;

  wrapper: Slot<'div'>;
};

/**
 * TableCellLayout Props
 */
export type TableCellLayoutProps = ComponentProps<Partial<TableCellLayoutSlots>> & {
  appearance?: 'primary';
};

/**
 * State used in rendering TableCellLayout
 */
export type TableCellLayoutState = ComponentState<TableCellLayoutSlots> & Pick<TableCellLayoutProps, 'appearance'>;
