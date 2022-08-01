import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { ARIAButtonSlotProps } from '@fluentui/react-aria';

export type TableHeaderCellSlots = {
  root: Slot<'th', 'div'>;

  /**
   * Button handles correct narration and interactions for sorting;
   */
  button: NonNullable<Slot<ARIAButtonSlotProps>>;
};

/**
 * TableHeaderCell Props
 */
export type TableHeaderCellProps = ComponentProps<Partial<TableHeaderCellSlots>> & {};

/**
 * State used in rendering TableHeaderCell
 */
export type TableHeaderCellState = ComponentState<TableHeaderCellSlots>;
