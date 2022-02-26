import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type MenuDividerSlots = {
  root: NonNullable<Slot<'div'>>;
};

export type MenuDividerProps = ComponentProps<MenuDividerSlots>;

export type MenuDividerState = ComponentState<MenuDividerSlots>;
