import { CardSize } from '@uifabric/dashboard';
import { IDashboardCardLayout, DashboardGridBreakpointLayouts } from '../components/DashboardGridLayout/DashboardGridLayout.types';
import { Layout, Layouts } from 'react-grid-layout';

// TODO, this should be exposed through props
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
