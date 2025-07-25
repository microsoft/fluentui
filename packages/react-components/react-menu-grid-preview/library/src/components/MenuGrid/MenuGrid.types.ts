import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TabsterDOMAttribute } from '@fluentui/react-tabster';

import type { MenuGridContextValue } from '../../contexts/menuGridContext';

export type MenuGridSlots = {
  root: Slot<'div'>;
};

export type MenuGridProps = ComponentProps<MenuGridSlots> & {};

export type MenuGridState = ComponentState<MenuGridSlots> & {
  /**
   * Tabster row attributes applied to the `MenuGridRow` components
   */
  tableRowTabsterAttribute: TabsterDOMAttribute | null;
};

export type MenuGridContextValues = {
  menuGrid: MenuGridContextValue;
};
