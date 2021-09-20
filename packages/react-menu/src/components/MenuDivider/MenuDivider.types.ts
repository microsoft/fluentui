import { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type MenuDividerSlots = {
  root: IntrinsicShorthandProps<'div'>;
};

export interface MenuDividerProps extends ComponentProps<MenuDividerSlots> {}

export interface MenuDividerState extends ComponentState<MenuDividerSlots> {}
