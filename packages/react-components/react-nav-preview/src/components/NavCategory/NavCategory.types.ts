import { NavItemValue } from '../NavContext.types';
import { NavCategoryContextValue } from '../NavCategoryContext';

import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavCategorySlots = {
  root: NonNullable<Slot<'div'>>;
};

/**
 * NavCategory Props
 */
export type NavCategoryProps = ComponentProps<NavCategorySlots> & {
  /**
   * Required value that identifies this item inside an Nav component.
   */
  value: NavItemValue;
};

/**
 * State used in rendering NavCategory
 */
export type NavCategoryState = ComponentState<NavCategorySlots> & NavCategoryContextValue;
