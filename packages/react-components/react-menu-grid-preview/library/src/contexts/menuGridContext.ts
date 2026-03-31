'use client';

import * as React from 'react';
import { TabsterDOMAttribute } from '@fluentui/react-tabster';

export const MenuGridContext = React.createContext<MenuGridContextValue | undefined>(
  undefined,
) as React.Context<MenuGridContextValue>;

const menuGridContextDefaultValue: MenuGridContextValue = {
  tableRowTabsterAttribute: null,
  setFocusByFirstCharacter: undefined,
};

/**
 * Context shared between MenuGrid and its children components
 */
export type MenuGridContextValue = {
  /**
   * Tabster row attributes applied to the `MenuGridRow` components
   */
  tableRowTabsterAttribute: TabsterDOMAttribute | null;

  /**
   * Callback to focus the first row in the grid whose text content starts with the given character.
   */
  setFocusByFirstCharacter?: (e: React.KeyboardEvent<HTMLElement>, itemEl: HTMLElement) => void;
};

export const MenuGridContextProvider = MenuGridContext.Provider;

export const useMenuGridContext_unstable = (): MenuGridContextValue =>
  React.useContext(MenuGridContext) ?? menuGridContextDefaultValue;
