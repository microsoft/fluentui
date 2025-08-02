import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { MenuGridRowContextValue } from '../../contexts/menuGridRowContext';

export type MenuGridRowSlots = {
  root: Slot<'div'>;
};

export type MenuGridRowProps = ComponentProps<MenuGridRowSlots>;

export type MenuGridRowState = ComponentState<MenuGridRowSlots>;

export type MenuGridRowContextValues = {
  menuGridRow: MenuGridRowContextValue;
};
