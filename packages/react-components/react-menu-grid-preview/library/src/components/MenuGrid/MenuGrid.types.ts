import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TabsterDOMAttribute } from '@fluentui/react-tabster';
import type { MenuListContextValue } from '@fluentui/react-menu';

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

  /**
   * Callback to focus the first row in the grid whose text content starts with the given character.
   */
  setFocusByFirstCharacter?: (e: React.KeyboardEvent<HTMLElement>, itemEl: HTMLElement) => void;
};

export type MenuGridContextValues = {
  menuGrid: MenuGridContextValue;
  menuList: MenuListContextValue;
};
