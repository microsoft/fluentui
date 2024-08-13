import * as React from 'react';

import { LineChartBasicExample } from './LineChart.Basic.Example';
import { LineChartCustomAccessibilityExample } from './LineChart.CustomAccessibility.Example';
import { LineChartCustomLocaleDateAxisExample } from './LineChart.CustomLocaleDateAxis.Example';
import { LineChartEventsExample } from './LineChart.Events.Example';
import { LineChartGapsExample } from './LineChart.Gaps.Example';
import { LineChartLargeDataExample } from './LineChart.LargeData.Example';
import { LineChartMultipleExample } from './LineChart.Multiple.Example';
import { LineChartStyledExample } from './LineChart.Styled.Example';

export const Basic = () => <LineChartBasicExample />;

export const CustomAccessibility = () => <LineChartCustomAccessibilityExample />;

export const CustomLocaleDateAxis = () => <LineChartCustomLocaleDateAxisExample />;

export const Events = () => <LineChartEventsExample />;

export const Gaps = () => <LineChartGapsExample />;

export const LargeData = () => <LineChartLargeDataExample />;

export const Multiple = () => <LineChartMultipleExample />;

export const Styled = () => <LineChartStyledExample />;

export default {
  title: 'Components/LineChart',
};
