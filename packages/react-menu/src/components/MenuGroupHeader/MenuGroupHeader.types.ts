import { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type MenuGroupHeaderSlots = {
  root: IntrinsicShorthandProps<'div'>;
};

/**
 * {@docCategory MenuGroupHeader}
 */
export interface MenuGroupHeaderProps extends ComponentProps<MenuGroupHeaderSlots> {}

/**
 * {@docCategory MenuGroupHeader}
 */
export interface MenuGroupHeaderState extends ComponentState<MenuGroupHeaderSlots> {}
