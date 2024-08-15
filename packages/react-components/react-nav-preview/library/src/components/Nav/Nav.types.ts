import * as React from 'react';

import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';
import type { NavContextValue, NavItemValue } from '../NavContext.types';

export type NavSlots = {
  root: NonNullable<Slot<'div'>>;
};

export type NavSize = 'small' | 'medium';

/**
 * Nav Props
 */
export type NavProps = ComponentProps<NavSlots> & {
  /**
   * Nav size may change between unselected and selected states.
   * The default scenario is a selected NavItem has bold text.
   *
   * When true, this property requests navItems be the same size whether unselected or selected.
   * @default true
   */
  reserveSelectedNavItemSpace?: boolean;

  /**
   * The value of the navItem to be selected by default.
   * Typically useful when the selectedValue is uncontrolled.
   *  Mutually exclusive with selectedValue.
   */
  defaultSelectedValue?: NavItemValue;

  /**
   * The value of the navCategory to be selected by default.
   * Typically useful when the selectedValue is uncontrolled.
   *  Mutually exclusive with selectedValue.
   */
  defaultSelectedCategoryValue?: NavItemValue;

  /**
   * Raised when a navItem is selected.
   */
  onNavItemSelect?: EventHandler<OnNavItemSelectData>;

  /**
   * The value of the currently selected navItem.
   * Mutually exclusive with defaultSelectedValue.
   */
  selectedValue?: NavItemValue;

  /**
   * Indicates a category that has a selected child
   * Will show the category as selected if it is closed.
   * Null otherwise
   */
  selectedCategoryValue?: NavItemValue;

  /**
   * Indicates if Nav supports multiple open Categories at the same time.
   * @default true, indicating that multiple categories can be open at the same time.
   */
  multiple?: boolean;

  /**
   * Callback used by NavCategoryItem to request a change on it's own opened state
   */
  onNavCategoryItemToggle?: EventHandler<OnNavItemSelectData>;

  /**
   * The size and density of the Nav and it's children
   *
   * @default 'medium'
   */
  size?: NavSize;
};

export type OnNavItemSelectData = EventData<'click', React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>> & {
  /**
   * The value of the selected navItem.
   */
  value: NavItemValue;

  /**
   * The parent value of the selected navItem
   * Null if not a child of a category
   */
  categoryValue?: NavItemValue;
};

/**
 * State used in rendering Nav
 */
export type NavState = ComponentState<NavSlots> & NavContextValue;
