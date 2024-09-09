import * as React from 'react';

import { GroupedVerticalBarChartBasicExample } from './GroupedVerticalBarChart.Basic.Example';
import { GroupedVerticalBarChartCustomAccessibilityExample } from './GroupedVerticalBarChart.CustomAccessibility.Example';
import { GroupedVerticalBarChartStyledExample } from './GroupedVerticalBarChart.Styled.Example';
import { GroupedVerticalBarChartTruncatedExample } from './GroupedVerticalBarChart.Truncated.Example';

export const Basic = () => <GroupedVerticalBarChartBasicExample />;

export const CustomAccessibility = () => <GroupedVerticalBarChartCustomAccessibilityExample />;

export const Styled = () => <GroupedVerticalBarChartStyledExample />;

export const Truncated = () => <GroupedVerticalBarChartTruncatedExample />;

export default {
  title: 'Components/GroupedVerticalBarChart',
};
