import * as React from 'react';
import { ComponentProps, ComponentState, ObjectShorthandProps } from '@fluentui/react-utilities';

export type MenuGroupHeaderSlots = {
  root: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
};

/**
 * {@docCategory MenuGroupHeader}
 */
export interface MenuGroupHeaderProps extends ComponentProps<MenuGroupHeaderSlots> {}

/**
 * {@docCategory MenuGroupHeader}
 */
export interface MenuGroupHeaderState extends ComponentState<MenuGroupHeaderSlots> {}
