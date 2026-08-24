import type { NavCategoryItemState as NavCategoryItemHeadlessState } from '@fluentui/react-headless-components-preview/nav';

import type { NavDensity } from '../Nav.types';

export type {
  NavCategoryItemContextValues,
  NavCategoryItemProps,
  NavCategoryItemSlots,
} from '@fluentui/react-headless-components-preview/nav';

/** Windmod NavCategoryItem state: headless state plus the density resolved from the nav context. */
export type NavCategoryItemState = NavCategoryItemHeadlessState & {
  density: NavDensity;
  root: { 'data-density'?: NavDensity };
};
