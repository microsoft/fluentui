import * as React from 'react';
<<<<<<< HEAD
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import type { MenuGroupContextValue } from '../../contexts/menuGroupContext';
=======
import { ComponentProps, ComponentState, ObjectShorthandProps } from '@fluentui/react-utilities';
import { MenuGroupContextValue } from '../../contexts/menuGroupContext';
>>>>>>> Updates react-menu to use root as slot

export type MenuGroupSlots = {
  root: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
};

/**
 * {@docCategory MenuGroup}
 */
export interface MenuGroupProps extends ComponentProps<MenuGroupSlots> {}

/**
 * {@docCategory MenuGroup}
 */
export interface MenuGroupState extends ComponentState<MenuGroupSlots> {
  /**
   * id applied to the DOM element of `MenuGroupHeader`
   */
  headerId: string;
}

export interface MenuGroupContextValues {
  menuGroup: MenuGroupContextValue;
}
