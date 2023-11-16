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
   * When true, this property requests tabs be the same size whether unselected or selected.
   * @default true
   */
  reserveSelectedNavGroupSpace?: boolean;

  /**
   * The value of the tab to be selected by default.
   * Typically useful when the selectedValue is uncontrolled.
   */
  defaultSelectedValue?: NavGroupValue;

  /**
   * Raised when a tab is selected.
   */
  onNavGroupSelect?: SelectNavGroupEventHandler;

  /**
   * The value of the currently selected tab.
   */
  selectedValue?: NavGroupValue;
};

/**
 * State used in rendering Nav
 */
export type NavState = ComponentState<NavSlots> & NavContextValue;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from NavProps.
// & Required<Pick<NavProps, 'propName'>>
