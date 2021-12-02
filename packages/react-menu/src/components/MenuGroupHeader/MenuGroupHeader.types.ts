import type { ComponentProps, ComponentState, IntrinsicSlotProps } from '@fluentui/react-utilities';

export type MenuGroupHeaderSlots = {
  root: IntrinsicSlotProps<'div'>;
};

export type MenuGroupHeaderProps = ComponentProps<MenuGroupHeaderSlots>;

export type MenuGroupHeaderState = ComponentState<MenuGroupHeaderSlots>;
