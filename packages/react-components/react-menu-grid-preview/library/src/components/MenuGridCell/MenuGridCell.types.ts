import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type MenuGridCellSlots = {
  root: Slot<'div'>;
};

export type MenuGridCellProps = ComponentProps<MenuGridCellSlots>;

export type MenuGridCellState = ComponentState<MenuGridCellSlots>;
