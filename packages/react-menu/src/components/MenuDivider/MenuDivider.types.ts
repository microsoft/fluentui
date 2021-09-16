import { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type MenuDividerSlots = {
  root: IntrinsicShorthandProps<'div'>;
};

/**
 * {@docCategory MenuDivider}
 */
export interface MenuDividerProps extends ComponentProps<MenuDividerSlots> {}

/**
 * {@docCategory MenuDivider}
 */
export interface MenuDividerState extends ComponentState<MenuDividerSlots> {}
