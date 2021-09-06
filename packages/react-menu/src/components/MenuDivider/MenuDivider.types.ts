import * as React from 'react';
import { ComponentProps, ComponentState, ObjectShorthandProps } from '@fluentui/react-utilities';

export type MenuDividerSlots = {
  root: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
};

/**
 * {@docCategory MenuDivider}
 */
export interface MenuDividerProps extends ComponentProps<MenuDividerSlots> {}

/**
 * {@docCategory MenuDivider}
 */
export interface MenuDividerState extends ComponentState<MenuDividerSlots> {}
