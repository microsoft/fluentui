import * as React from 'react';

import { VerticalBarChartTooltipExample } from './VerticalBarChart.AxisTooltip.Example';
import { VerticalBarChartBasicExample } from './VerticalBarChart.Basic.Example';
import { VerticalBarChartCustomAccessibilityExample } from './VerticalBarChart.CustomAccessibility.Example';
import { VerticalBarChartDateAxisExample } from './VerticalBarChart.DateAxis.Example';
import { VerticalBarChartDynamicExample } from './VerticalBarChart.Dynamic.Example';
import { VerticalBarChartRotatedLabelExample } from './VerticalBarChart.RotateLabels.Example';
import { VerticalBarChartStyledExample } from './VerticalBarChart.Styled.Example';

export const Basic = () => <VerticalBarChartBasicExample />;

export const CustomAccessibility = () => <VerticalBarChartCustomAccessibilityExample />;

export const DateAxis = () => <VerticalBarChartDateAxisExample />;

export const Dynamic = () => <VerticalBarChartDynamicExample />;

export const Styled = () => <VerticalBarChartStyledExample />;

export const RotatedLabel = () => <VerticalBarChartRotatedLabelExample />;

export const Tooltip = () => <VerticalBarChartTooltipExample />;

export default {
  title: 'Components/VerticalBarChart',
};
