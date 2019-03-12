import { CardSize } from '@uifabric/dashboard';
import { IDashboardCardLayout, DashboardGridBreakpointLayouts } from '../components/DashboardGridLayout/DashboardGridLayout.types';
import { Breakpoints, Layout, Layouts } from 'react-grid-layout-fabric';

/**
 * The is the default CardSizeToWidthHeight. In case this prop is not provided in the control
 */
export const CardSizeToWidthHeight: { [P in CardSize]: { w: number; h: number } } = {
  small: { w: 1, h: 4 },
  mediumTall: { w: 1, h: 8 },
  mediumWide: { w: 2, h: 4 },
  large: { w: 2, h: 8 },
  section: { w: 4, h: 1 }
};

/**
 * Given the dashboard layout for all breakpoints, return the first defined one
 * @param layouts
 */
export const getFirstDefinedDashboardLayout = (layouts: DashboardGridBreakpointLayouts): IDashboardCardLayout[] => {
  if (layouts.lg) {
    return layouts.lg;
  } else if (layouts.md) {
    return layouts.md;
  } else if (layouts.sm) {
    return layouts.sm;
  } else if (layouts.xs) {
    return layouts.xs;
  } else if (layouts.xxs) {
    return layouts.xxs;
  }
  return [];
};

/**
 * Given the React-Grid-Layout layout for all breakpoints, return the first defined one
 * @param layouts
 */
export const getFirstDefinedLayout = (layouts: Layouts): Layout[] => {
  if (layouts.lg) {
    return layouts.lg;
  } else if (layouts.md) {
    return layouts.md;
  } else if (layouts.sm) {
    return layouts.sm;
  } else if (layouts.xs) {
    return layouts.xs;
  } else if (layouts.xxs) {
    return layouts.xxs;
  }
  return [];
};

/**
 * compare two layout object by y value
 * @param a layout to be compared
 * @param b layout to be compared
 */
export const compareLayoutY = (a: IDashboardCardLayout | Layout, b: IDashboardCardLayout | Layout): number => {
  if (a.y < b.y) {
    return -1;
  }
  if (a.y > b.y) {
    return 1;
  }
  return 0;
};

/**
 * Update layouts for the given breakpoint
 * @param layouts the layouts object
 * @param layout the layout for the given breakpoint
 * @param breakpoint the breakpoint tobe updated
 */
export const updateLayoutsFromLayout = (layouts: Layouts, layout: Layout[], breakpoint: Breakpoints) => {
  switch (breakpoint) {
    case 'lg':
      layouts.lg = layout;
      break;
    case 'md':
      layouts.md = layout;
      break;
    case 'sm':
      layouts.sm = layout;
      break;
    case 'xs':
      layouts.xs = layout;
      break;
    case 'xxs':
      layouts.xxs = layout;
      break;
  }
};
