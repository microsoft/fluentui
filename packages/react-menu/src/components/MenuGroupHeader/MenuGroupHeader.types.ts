import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type MenuGroupHeaderSlots = {
  root: Slot<'div'>;
};

export type MenuGroupHeaderProps = ComponentProps<MenuGroupHeaderSlots>;

export type MenuGroupHeaderState = ComponentState<MenuGroupHeaderSlots>;
