import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { NavContextValue, NavGroupValue, SelectNavGroupEventHandler } from '../NavContext.types';

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
  onNavGroupSelect?: SelectNavGroupEventHandler;

  /**
   * The value of the currently selected navGroup.
   * Mutually exclusive with defaultSelectedValue.
   */
  selectedValue?: NavGroupValue;
};

/**
 * State used in rendering Nav
 */
export type NavState = ComponentState<NavSlots> & NavContextValue;
