import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { MenuGridCellContextValue } from '../../contexts/menuGridCellContext';

export type MenuGridCellSlots = {
  root: Slot<'div'>;
};

export type MenuGridCellProps = ComponentProps<MenuGridCellSlots>;

export type MenuGridCellState = ComponentState<MenuGridCellSlots>;

export type MenuGridCellContextValues = {
  menuGridCell: MenuGridCellContextValue;
};
