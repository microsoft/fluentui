import type { ComponentProps, ComponentState, ComponentRender, Slot } from '@fluentui/react-utilities';

export type MenuDividerSlots = {
  root: Slot<'div'>;
};

export type MenuDividerProps = ComponentProps<MenuDividerSlots>;

export type MenuDividerState = ComponentState<MenuDividerSlots>;

export type MenuDividerRender = ComponentRender<MenuDividerState>;
