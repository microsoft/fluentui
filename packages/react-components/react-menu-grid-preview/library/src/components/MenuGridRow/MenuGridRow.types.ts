import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type MenuGridRowSlots = {
  root: Slot<'div'>;
};

export type MenuGridRowProps = ComponentProps<MenuGridRowSlots>;

export type MenuGridRowState = ComponentState<MenuGridRowSlots>;
