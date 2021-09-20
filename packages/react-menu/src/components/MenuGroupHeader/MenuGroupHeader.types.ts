import { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type MenuGroupHeaderSlots = {
  root: IntrinsicShorthandProps<'div'>;
};

export interface MenuGroupHeaderProps extends ComponentProps<MenuGroupHeaderSlots> {}

export interface MenuGroupHeaderState extends ComponentState<MenuGroupHeaderSlots> {}
