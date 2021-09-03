import { ComponentProps, ComponentState, ElementShorthandProps } from '@fluentui/react-utilities';

export type MenuDividerSlots = {
  root: ElementShorthandProps<'div'>;
};

/**
 * {@docCategory MenuDivider}
 */
export interface MenuDividerProps extends ComponentProps<MenuDividerSlots> {}

/**
 * {@docCategory MenuDivider}
 */
export interface MenuDividerState extends ComponentState<MenuDividerSlots> {}
