import * as React from 'react';
<<<<<<< HEAD
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
=======
import { ComponentProps, ComponentState, ObjectShorthandProps } from '@fluentui/react-utilities';

export type MenuDividerSlots = {
  root: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
};
>>>>>>> Updates react-menu to use root as slot

/**
 * {@docCategory MenuDivider}
 */
export interface MenuDividerProps extends ComponentProps<MenuDividerSlots> {}

/**
 * {@docCategory MenuDivider}
 */
export interface MenuDividerState extends ComponentState<MenuDividerSlots> {}
