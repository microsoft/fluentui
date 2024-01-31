import * as React from 'react';
import type { EventHandler, NavProps, OnNavItemSelectData } from './Nav/Nav.types';

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
    selectedValue?: NavItemValue;
    previousSelectedValue?: NavItemValue;
    registeredNavItems: Record<string, NavItemRegisterData>;
  };
};

/**
 * Any value that identifies a specific Item.
 */
export type NavItemValue = unknown;

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
  value: NavItemValue;

  /**
   * The reference to the navItem HTML element.
   */
  ref: React.RefObject<HTMLElement>;
};

export type RegisterNavItemEventHandler = (data: NavItemRegisterData) => void;
