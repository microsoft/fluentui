import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TableCellLayoutSlots } from '../TableCellLayout';

export type TableCellPrimaryLayoutSlots = {
  main: Slot<'span'>;

  secondary: Slot<'span'>;

  wrapper: Slot<'div'>;
} & TableCellLayoutSlots;

/**
 * TableCellPrimaryLayout Props
 */
export type TableCellPrimaryLayoutProps = ComponentProps<Partial<TableCellPrimaryLayoutSlots>> & {};

/**
 * State used in rendering TableCellPrimaryLayout
 */
export type TableCellPrimaryLayoutState = ComponentState<TableCellPrimaryLayoutSlots>;
