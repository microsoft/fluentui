import * as React from 'react';
import type { EventHandler, NavProps, OnNavItemSelectData } from './Nav/Nav.types';
import type { NavCategoryItemValue } from './NavCategoryItem/NavCategoryItem.types';

export type NavContextValue = Pick<NavProps, 'onNavItemSelect' | 'selectedValue' | 'reserveSelectedNavItemSpace'> & {
  /** A callback to allow a navItem to register itself with the navItem list. */
  onRegister: RegisterNavItemEventHandler;

  /** A callback to allow a navItem to unregister itself with the navItem list. */
  onUnregister: RegisterNavItemEventHandler;
  /**
   * A callback to allow a navItem to select itself when pressed.
   */
  onSelect: EventHandler<OnNavItemSelectData>;
  /**
   * Gets the registered navItem data along with current and previous selected values.
   */
  getRegisteredNavItems: () => {
    selectedValue?: NavCategoryItemValue;
    previousSelectedValue?: NavCategoryItemValue;
    registeredNavItems: Record<string, NavItemRegisterData>;
  };
};

/**
 * Context values used in rendering navItemList.
 */
export type NavContextValues = {
  /**
   * The context of the navItem list available to each navItem.
   */
  nav: NavContextValue;
};

export type NavItemRegisterData = {
  /**
   * The value of the navItem.
   */
  value: NavCategoryItemValue;

  /**
   * The reference to the navItem HTML element.
   */
  ref: React.RefObject<HTMLElement>;
};

export type RegisterNavItemEventHandler = (data: NavItemRegisterData) => void;
