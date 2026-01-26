import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { MenuGridRowGroupHeaderContextValue } from '../../contexts/menuGridRowGroupHeaderContext';

export type MenuGridRowGroupHeaderSlots = {
  root: Slot<'div'>;
};

export type MenuGridRowGroupHeaderProps = ComponentProps<MenuGridRowGroupHeaderSlots>;

export type MenuGridRowGroupHeaderState = ComponentState<MenuGridRowGroupHeaderSlots>;

export type MenuGridRowGroupHeaderContextValues = {
  menuGridRowGroupHeader: MenuGridRowGroupHeaderContextValue;
};
