import * as React from 'react';
import type { EventHandler, NavProps, OnNavGroupSelectData } from './Nav/Nav.types';
import type { NavGroupValue } from './NavGroup/NavGroup.types';

export type NavContextValue = Pick<NavProps, 'onNavGroupSelect' | 'selectedValue' | 'reserveSelectedNavGroupSpace'> & {
  /** A callback to allow a navGroup to register itself with the navGroup list. */
  onRegister: RegisterNavGroupEventHandler;

  /** A callback to allow a navGroup to unregister itself with the navGroup list. */
  onUnregister: RegisterNavGroupEventHandler;
  /**
   * A callback to allow a navGroup to select itself when pressed.
   */
  onSelect: EventHandler<OnNavGroupSelectData>;
  /**
   * Gets the registered navGroup data along with current and previous selected values.
   */
  getRegisteredNavGroups: () => {
    selectedValue?: NavGroupValue;
    previousSelectedValue?: NavGroupValue;
    registeredNavGroups: Record<string, NavGroupRegisterData>;
  };
};

/**
 * Context values used in rendering navGroupList.
 */
export type NavContextValues = {
  /**
   * The context of the navGroup list available to each navGroup.
   */
  nav: NavContextValue;
};

export type NavGroupRegisterData = {
  /**
   * The value of the navGroup.
   */
  value: NavGroupValue;

  /**
   * The reference to the navGroup HTML element.
   */
  ref: React.RefObject<HTMLElement>;
};

export type RegisterNavGroupEventHandler = (data: NavGroupRegisterData) => void;
