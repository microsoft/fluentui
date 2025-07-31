import { PresenceMotionSlotProps } from '@fluentui/react-motion';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { NavDensity } from '../Nav/Nav.types';

/**
 * Context value for NavSubItemGroup
 */
export type NavSubItemGroupCollapseMotionParams = {
  /**
   * The number of items in the NavSubItemGroup
   */
  items?: number;

  /**
   * The density of the NavItem
   */
  density?: NavDensity;
};

export type NavSubItemGroupSlots = {
  /**
   * The root element
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * Collapse motion slot
   */
  collapseMotion?: Slot<PresenceMotionSlotProps<NavSubItemGroupCollapseMotionParams>>;
};

/**
 * NavSubItemGroup Props
 */
export type NavSubItemGroupProps = ComponentProps<NavSubItemGroupSlots>;

/**
 * State used in rendering NavSubItemGroup
 */
export type NavSubItemGroupState = ComponentState<NavSubItemGroupSlots> & {
  /**
   * Internal open state, provided by context.
   */
  open: boolean;
};
