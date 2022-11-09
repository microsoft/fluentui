import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { Checkbox, CheckboxProps } from '@fluentui/react-checkbox';
import type { Radio } from '@fluentui/react-radio';
import { TableCellSlots } from '../TableCell/TableCell.types';
import { TableContextValue } from '../Table/Table.types';

export type TableSelectionCellSlots = {
  /**
   * Selection indicator if selection type is checkbox
   */
  checkboxIndicator: Slot<typeof Checkbox>;
  /**
   * Selection indicator if selection type is radio
   */
  radioIndicator: Slot<typeof Radio>;
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
  /**
   * Only visible when checked or the parent row is hovered
   */
  subtle?: boolean;

  /**
   * Completely hides the selection cell visually but takes up the same space
   */
  hidden?: boolean;
};

/**
 * State used in rendering TableSelectionCell
 */
export type TableSelectionCellState = ComponentState<TableSelectionCellSlots> &
  Pick<Required<TableSelectionCellProps>, 'type' | 'checked' | 'subtle' | 'hidden'> &
  Pick<TableContextValue, 'noNativeElements'>;
