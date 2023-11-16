import * as React from 'react';
import { NavProps } from './Nav/Nav.types';

export type NavContextValue = Pick<NavProps, 'onNavGroupSelect' | 'selectedValue' | 'reserveSelectedNavGroupSpace'> & {
  /** A callback to allow a tab to register itself with the tab list. */
  onRegister: RegisterNavGroupEventHandler;

  /** A callback to allow a tab to unregister itself with the tab list. */
  onUnregister: RegisterNavGroupEventHandler;
  /**
   * A callback to allow a tab to select itself when pressed.
   */
  onSelect: SelectNavGroupEventHandler;
  /**
   * Gets the registered tab data along with current and previous selected values.
   */
  getRegisteredNavGroups: () => {
    selectedValue?: NavGroupValue;
    previousSelectedValue?: NavGroupValue;
    registeredNavGroups: Record<string, NavGroupRegisterData>;
  };
};

/**
 * Context values used in rendering TabList.
 */
export type NavContextValues = {
  /**
   * The context of the tab list available to each tab.
   */
  nav: NavContextValue;
};

export type NavGroupRegisterData = {
  /**
   * The value of the tab.
   */
  value: NavGroupValue;

  /**
   * The reference to the tab HTML element.
   */
  ref: React.RefObject<HTMLElement>;
};

/**
 * Any value that identifies a specific tab.
 */
export type NavGroupValue = unknown;

export type SelectNavGroupData = {
  /**
   * The value of the selected tab.
   */
  value: NavGroupValue;
};

export type SelectNavGroupEvent<E = HTMLElement> = React.MouseEvent<E> | React.KeyboardEvent<E>;

export type SelectNavGroupEventHandler = (event: SelectNavGroupEvent, data: SelectNavGroupData) => void;

export type RegisterNavGroupEventHandler = (data: NavGroupRegisterData) => void;
