import { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type MenuDividerSlots = {
  root: IntrinsicShorthandProps<'div'>;
};

export type MenuDividerProps = ComponentProps<MenuDividerSlots>;

export type MenuDividerState = ComponentState<MenuDividerSlots>;
