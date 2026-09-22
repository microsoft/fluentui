import type { PresenceMotionSlotProps } from '@fluentui/react-motion';
import type { ComponentState, Slot } from '@fluentui/react-utilities';
import type {
  NavCategoryItemContextValue,
  NavCategoryItemContextValues,
  NavCategoryItemProps as NavCategoryItemBaseProps,
  NavCategoryItemSlots as NavCategoryItemBaseSlots,
  NavCategoryItemState as NavCategoryItemBaseState,
} from '@fluentui/react-headless-components-preview/nav';
import type { NavDensity } from '../Nav/Nav.types';

export type { NavCategoryItemContextValue, NavCategoryItemContextValues };

export type NavCategoryItemSlots = Omit<NavCategoryItemBaseSlots, 'expandIcon'> & {
  expandIcon: NonNullable<NavCategoryItemBaseSlots['expandIcon']>;
  expandIconMotion?: Slot<PresenceMotionSlotProps>;
};

export type NavCategoryItemProps = NavCategoryItemBaseProps & Partial<Pick<NavCategoryItemSlots, 'expandIconMotion'>>;

export type NavCategoryItemState = Omit<NavCategoryItemBaseState, 'components' | 'expandIcon'> &
  ComponentState<NavCategoryItemSlots> & {
    density: NavDensity;
    root: NavCategoryItemBaseState['root'] & {
      'data-density': NavDensity;
    };
  };
