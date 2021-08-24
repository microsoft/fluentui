import * as React from 'react';
<<<<<<< HEAD
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
=======
import { ComponentProps, ComponentState, ObjectShorthandProps } from '@fluentui/react-utilities';

export type MenuGroupHeaderSlots = {
  root: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
};
>>>>>>> Updates react-menu to use root as slot

/**
 * {@docCategory MenuGroupHeader}
 */
export interface MenuGroupHeaderProps extends ComponentProps<MenuGroupHeaderSlots> {}

/**
 * {@docCategory MenuGroupHeader}
 */
export interface MenuGroupHeaderState extends ComponentState<MenuGroupHeaderSlots> {}
