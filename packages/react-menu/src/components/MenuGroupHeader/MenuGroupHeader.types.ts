import { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type MenuGroupHeaderSlots = {
  root: IntrinsicShorthandProps<'div'>;
};

export type MenuGroupHeaderProps = ComponentProps<MenuGroupHeaderSlots>;

export type MenuGroupHeaderState = ComponentState<MenuGroupHeaderSlots>;
