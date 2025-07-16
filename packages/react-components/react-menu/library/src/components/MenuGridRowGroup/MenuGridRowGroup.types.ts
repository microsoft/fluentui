import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { MenuGridRowGroupContextValue } from '../../contexts/menuGridRowGroupContext';

export type MenuGridRowGroupSlots = {
  root: Slot<'div'>;
};

export type MenuGridRowGroupProps = ComponentProps<MenuGridRowGroupSlots>;

export type MenuGridRowGroupState = ComponentState<MenuGridRowGroupSlots>;

export type MenuGridRowGroupContextValues = {
  menuGridRowGroup: MenuGridRowGroupContextValue;
};
