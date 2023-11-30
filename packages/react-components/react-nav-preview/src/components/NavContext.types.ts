import * as React from 'react';
import { NavProps } from './Nav/Nav.types';
import { EventData, EventHandler } from '@fluentui/react-utilities/src/compose/types';

export type NavContextValue = Pick<NavProps, 'onNavGroupSelect' | 'selectedValue' | 'reserveSelectedNavGroupSpace'> & {
  /** A callback to allow a navGroup to register itself with the navGroup list. */
  onRegister: RegisterNavGroupEventHandler;

  /** A callback to allow a navGroup to unregister itself with the navGroup list. */
  onUnregister: RegisterNavGroupEventHandler;
  /**
   * A callback to allow a navGroup to select itself when pressed.
   */
  onSelect: EventHandler<OnSelectData>;
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

/**
 * Any value that identifies a specific navGroup.
 */
export type NavGroupValue = unknown;

export type NavGroupElement = HTMLButtonElement;

export type OnSelectData = EventData<'click', React.MouseEvent<NavGroupElement>> & {
  /**
   * The value of the selected navGroup.
   */
  value: NavGroupValue;
};

export type RegisterNavGroupEventHandler = (data: NavGroupRegisterData) => void;
