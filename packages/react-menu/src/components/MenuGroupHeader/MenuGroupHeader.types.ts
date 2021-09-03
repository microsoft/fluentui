import { ComponentProps, ComponentState, ObjectShorthandPropsAs } from '@fluentui/react-utilities';

export type MenuGroupHeaderSlots = {
  root: ObjectShorthandPropsAs<'div'>;
};

/**
 * {@docCategory MenuGroupHeader}
 */
export interface MenuGroupHeaderProps extends ComponentProps<MenuGroupHeaderSlots> {}

/**
 * {@docCategory MenuGroupHeader}
 */
export interface MenuGroupHeaderState extends ComponentState<MenuGroupHeaderSlots> {}
