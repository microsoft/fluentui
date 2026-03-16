import * as React from 'react';

import { GroupedVerticalBarChartBasicExample } from './GroupedVerticalBarChart.Basic.Example';
import { GroupedVerticalBarChartCustomAccessibilityExample } from './GroupedVerticalBarChart.CustomAccessibility.Example';
import { GroupedVerticalBarChartStyledExample } from './GroupedVerticalBarChart.Styled.Example';
import { GroupedVerticalBarChartTruncatedExample } from './GroupedVerticalBarChart.Truncated.Example';
import { GroupedVerticalBarChartSecondaryYAxisExample } from './GroupedVerticalBarChart.SecondaryYAxis.Example';
import { GroupedVerticalBarChartNegativeExample } from './GroupedVerticalBarChart.Negative.Example';
import { GroupedVerticalBarChartLineExample } from './GroupedVerticalBarChart.Line.Example';

export const Basic = () => <GroupedVerticalBarChartBasicExample />;

export const CustomAccessibility = () => <GroupedVerticalBarChartCustomAccessibilityExample />;

export const Styled = () => <GroupedVerticalBarChartStyledExample />;

export const Truncated = () => <GroupedVerticalBarChartTruncatedExample />;

export const SecondaryYAxis = () => <GroupedVerticalBarChartSecondaryYAxisExample />;

export const Negative = () => <GroupedVerticalBarChartNegativeExample />;

export const Line = () => <GroupedVerticalBarChartLineExample />;

export default {
  title: 'Components/GroupedVerticalBarChart',
};
