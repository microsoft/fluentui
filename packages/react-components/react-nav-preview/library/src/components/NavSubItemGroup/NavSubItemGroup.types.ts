import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavSubItemGroupSlots = {
  root: NonNullable<Slot<'div'>>;
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
