import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { NavItemValue } from '../NavContext.types';
import { NavCategoryContextValue } from '../NavCategoryContext';

export type NavCategorySlots = {
  root: NonNullable<Slot<'div'>>;
};

/**
 * NavCategory Props
 */
export type NavCategoryProps = ComponentProps<NavCategorySlots> & {
  /**
   * Required value that identifies this item inside an Accordion component.
   */
  value: NavItemValue;
};

/**
 * State used in rendering NavCategory
 */
export type NavCategoryState = ComponentState<NavCategorySlots> & NavCategoryContextValue;
