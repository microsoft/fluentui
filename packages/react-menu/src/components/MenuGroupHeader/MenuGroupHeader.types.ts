import { ComponentProps, ComponentState, ElementShorthandProps } from '@fluentui/react-utilities';

export type MenuGroupHeaderSlots = {
  root: ElementShorthandProps<'div'>;
};

/**
 * {@docCategory MenuGroupHeader}
 */
export interface MenuGroupHeaderProps extends ComponentProps<MenuGroupHeaderSlots> {}

/**
 * {@docCategory MenuGroupHeader}
 */
export interface MenuGroupHeaderState extends ComponentState<MenuGroupHeaderSlots> {}
