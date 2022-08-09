import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { Checkbox, CheckboxProps } from '@fluentui/react-checkbox';
import { TableCellSlots, TableCellState } from '../TableCell/TableCell.types';

export type TableSelectionCellSlots = {
  /**
   * Selection indicator if selection type is checkbox
   */
  checkboxIndicator: Slot<typeof Checkbox>;
  /**
   * Selection indicator if selection type is radio
   */
  radioIndicator: Slot<'span'>;
} & Pick<TableCellSlots, 'root'>;

/**
 * TableSelectionCell Props
 */
export type TableSelectionCellProps = ComponentProps<Partial<Omit<TableSelectionCellSlots, 'media'>>> & {
  /**
   * A table can have two kinds of selection modes
   */
  type?: 'checkbox' | 'radio';
  checked?: CheckboxProps['checked'];
};

/**
 * State used in rendering TableSelectionCell
 */
export type TableSelectionCellState = ComponentState<TableSelectionCellSlots> &
  Pick<TableCellState, 'media'> &
  Pick<Required<TableSelectionCellProps>, 'type' | 'checked'>;
