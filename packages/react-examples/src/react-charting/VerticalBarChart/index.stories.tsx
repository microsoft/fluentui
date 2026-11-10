import * as React from 'react';

import { VerticalBarChartTooltipExample } from './VerticalBarChart.AxisTooltip.Example';
import { VerticalBarChartBasicExample } from './VerticalBarChart.Basic.Example';
import { VerticalBarChartCustomAccessibilityExample } from './VerticalBarChart.CustomAccessibility.Example';
import { VerticalBarChartDateAxisExample } from './VerticalBarChart.DateAxis.Example';
import { VerticalBarChartDynamicExample } from './VerticalBarChart.Dynamic.Example';
import { VerticalBarChartRotatedLabelExample } from './VerticalBarChart.RotateLabels.Example';
import { VerticalBarChartStyledExample } from './VerticalBarChart.Styled.Example';
import { VerticalBarChartNegativeExample } from './VerticalBarChart.Negative.Example';
import { VerticalBarChartAllNegativeExample } from './VerticalBarChart.AllNegative.Example';
import { VerticalBarChartResponsiveExample } from './VerticalBarChart.Responsive.Example';
import { VerticalBarChartSecondaryYAxisExample } from './VerticalBarChart.SecondaryYAxis.Example';

export const Basic = () => <VerticalBarChartBasicExample />;

export const CustomAccessibility = () => <VerticalBarChartCustomAccessibilityExample />;

export const DateAxis = () => <VerticalBarChartDateAxisExample />;

export const Dynamic = () => <VerticalBarChartDynamicExample />;

export const Styled = () => <VerticalBarChartStyledExample />;

export const RotatedLabel = () => <VerticalBarChartRotatedLabelExample />;

export const Tooltip = () => <VerticalBarChartTooltipExample />;

export const Negative = () => <VerticalBarChartNegativeExample />;

export const AllNegative = () => <VerticalBarChartAllNegativeExample />;

export const Responsive = () => <VerticalBarChartResponsiveExample />;

export const SecondaryYAxis = () => <VerticalBarChartSecondaryYAxisExample />;

export default {
  title: 'Components/VerticalBarChart',
};
