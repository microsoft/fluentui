import { ComponentProps, ComponentState, ObjectShorthandPropsAs } from '@fluentui/react-utilities';

export type MenuDividerSlots = {
  root: ObjectShorthandPropsAs<'div'>;
};

/**
 * {@docCategory MenuDivider}
 */
export interface MenuDividerProps extends ComponentProps<MenuDividerSlots> {}

/**
 * {@docCategory MenuDivider}
 */
export interface MenuDividerState extends ComponentState<MenuDividerSlots> {}
