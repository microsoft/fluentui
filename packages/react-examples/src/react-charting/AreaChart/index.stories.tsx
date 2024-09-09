import * as React from 'react';

import { AreaChartBasicExample } from './AreaChart.Basic.Example';
import { AreaChartCustomAccessibilityExample } from './AreaChart.CustomAccessibility.Example';
import { AreaChartDataChangeExample } from './AreaChart.DataChange.Example';
import { AreaChartLargeDataExample } from './AreaChart.LargeData.Example';
import { AreaChartMultipleExample } from './AreaChart.Multiple.Example';
import { AreaChartStyledExample } from './AreaChart.Styled.Example';

export const Basic = () => <AreaChartBasicExample />;
export const CustomAccessibility = () => <AreaChartCustomAccessibilityExample />;
export const DataChange = () => <AreaChartDataChangeExample />;
export const LargeData = () => <AreaChartLargeDataExample />;
export const Multiple = () => <AreaChartMultipleExample />;
export const Styled = () => <AreaChartStyledExample />;

export default {
  title: 'Components/AreaChart',
};
