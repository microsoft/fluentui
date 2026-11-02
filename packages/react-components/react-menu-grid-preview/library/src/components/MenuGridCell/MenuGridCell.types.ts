import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type MenuGridCellSlots = {
  root: Slot<'div'>;
};

export type MenuGridCellProps = ComponentProps<MenuGridCellSlots> & {
  /**
   * A MenuGridCell can be visually hidden, which is used for asymmetric grids
   * @defaultvalue false
   */
  visuallyHidden?: boolean;
};

export type MenuGridCellState = ComponentState<MenuGridCellSlots> & Pick<MenuGridCellProps, 'visuallyHidden'>;
