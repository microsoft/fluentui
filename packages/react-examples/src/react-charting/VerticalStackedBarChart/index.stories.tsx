import * as React from 'react';

import { VerticalStackedBarChartTooltipExample } from './VerticalStackedBarChart.AxisTooltip.Example';
import { VerticalStackedBarChartBasicExample } from './VerticalStackedBarChart.Basic.Example';
import { VerticalStackedBarChartCalloutExample } from './VerticalStackedBarChart.Callout.Example';
import { VerticalStackedBarChartCustomAccessibilityExample } from './VerticalStackedBarChart.CustomAccessibility.Example';
import { VerticalStackedBarChartDateAxisExample } from './VerticalStackedBarChart.DateAxis.Example';
import { VerticalStackedBarChartStyledExample } from './VerticalStackedBarChart.Styled.Example';
import { VerticalStackedBarChartSecondaryYAxisExample } from './VerticalStackedBarChart.SecondaryYAxis.Example';
import { VerticalStackedBarChartNegativeExample } from './VerticalStackedBarChart.Negative.Example';
import { VSBCAxisCategoryOrderExample } from './VerticalStackedBarChart.AxisCategoryOrder.Example';

export const Basic = () => <VerticalStackedBarChartBasicExample />;

export const Callout = () => <VerticalStackedBarChartCalloutExample />;

export const CustomAccessibility = () => <VerticalStackedBarChartCustomAccessibilityExample />;

export const DateAxis = () => <VerticalStackedBarChartDateAxisExample />;

export const Styled = () => <VerticalStackedBarChartStyledExample />;

export const Tooltip = () => <VerticalStackedBarChartTooltipExample />;

export const SecondaryYAxis = () => <VerticalStackedBarChartSecondaryYAxisExample />;

export const Negative = () => <VerticalStackedBarChartNegativeExample />;

export const AxisCategoryOrder = () => <VSBCAxisCategoryOrderExample />;

export default {
  title: 'Components/VerticalStackedBarChart',
};
