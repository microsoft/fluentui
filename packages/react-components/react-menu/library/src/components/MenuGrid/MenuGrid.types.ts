import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { MenuGridContextValue } from '../../contexts/menuGridContext';

export type MenuGridSlots = {
  root: Slot<'div'>;
};

export type MenuGridProps = ComponentProps<MenuGridSlots> & {};

export type MenuGridState = ComponentState<MenuGridSlots>;

export type MenuGridContextValues = {
  menuGrid: MenuGridContextValue;
};
