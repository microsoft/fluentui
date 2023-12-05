import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { NavContextValue } from '../NavContext.types';
import type { NavGroupValue } from '../NavGroup/NavGroup.types';

export type NavSlots = {
  root: NonNullable<Slot<'div'>>;
};

/**
 * Nav Props
 */
export type NavProps = ComponentProps<NavSlots> & {
  /**
   * Nav size may change between unselected and selected states.
   * The default scenario is a selected NavGroup has bold text.
   *
   * When true, this property requests navGroups be the same size whether unselected or selected.
   * @default true
   */
  reserveSelectedNavGroupSpace?: boolean;

  /**
   * The value of the navGroup to be selected by default.
   * Typically useful when the selectedValue is uncontrolled.
   *  Mutually exclusive with selectedValue.
   */
  defaultSelectedValue?: NavGroupValue;

  /**
   * Raised when a navGroup is selected.
   */
  onNavGroupSelect?: EventHandler<OnNavGroupSelectData>;

  /**
   * The value of the currently selected navGroup.
   * Mutually exclusive with defaultSelectedValue.
   */
  selectedValue?: NavGroupValue;
};

export type OnNavGroupSelectData = EventData<'click', React.MouseEvent<HTMLButtonElement>> & {
  /**
   * The value of the selected navGroup.
   */
  value: NavGroupValue;
};

/**
 * State used in rendering Nav
 */
export type NavState = ComponentState<NavSlots> & NavContextValue;

// Temporarily here until they go into @fluentui/react-utilities
type EventData<Type extends string, TEvent> =
  | { type: undefined; event: React.SyntheticEvent | Event }
  | { type: Type; event: TEvent };

type EventHandler<TData extends EventData<string, unknown>> = (ev: React.SyntheticEvent | Event, data: TData) => void;
