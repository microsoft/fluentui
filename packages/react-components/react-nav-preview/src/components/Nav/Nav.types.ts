import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { NavContextValue, NavItemValue } from '../NavContext.types';

export type NavSlots = {
  root: NonNullable<Slot<'div'>>;
};

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
   * Raised when a navItem is selected.
   */
  onNavItemSelect?: EventHandler<OnNavItemSelectData>;

  /**
   * The value of the currently selected navItem.
   * Mutually exclusive with defaultSelectedValue.
   */
  selectedValue?: NavItemValue;
};

export type OnNavItemSelectData = EventData<'click', React.MouseEvent<HTMLButtonElement>> & {
  /**
   * The value of the selected navItem.
   */
  value: NavItemValue;
};

/**
 * State used in rendering Nav
 */
export type NavState = ComponentState<NavSlots> & NavContextValue;

// Temporarily here until they go into @fluentui/react-utilities
export type EventData<Type extends string, TEvent> =
  | { type: undefined; event: React.SyntheticEvent | Event }
  | { type: Type; event: TEvent };

export type EventHandler<TData extends EventData<string, unknown>> = (
  ev: React.SyntheticEvent | Event,
  data: TData,
) => void;
