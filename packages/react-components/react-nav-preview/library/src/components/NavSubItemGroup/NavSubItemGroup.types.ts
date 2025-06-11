import { PresenceMotionSlotProps } from '@fluentui/react-motion/src/index';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { NavDensity } from '../Nav/Nav.types';

export type NavSubItemGroupCollapseMotionParams = {
  items?: number;
  density?: NavDensity;
};

export type NavSubItemGroupSlots = {
  root: NonNullable<Slot<'div'>>;
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
