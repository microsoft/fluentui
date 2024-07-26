import * as React from 'react';

import { MultiStackedBarChartCustomAccessibilityExample } from './MultiStackedBarChart.CustomAccessibility.Example';
import { MultiStackedBarChartExample } from './MultiStackedBarChart.Example';
import { MultiStackedBarChartWithPlaceholderExample } from './MultiStackedBarChartWithPlaceHolder.Example';
import { StackedBarChartBaseBarExample } from './StackedBarChart.BaseBar.Example';
import { StackedBarChartBasicExample } from './StackedBarChart.Basic.Example';
import { StackedBarChartBenchmarkExample } from './StackedBarChart.Benchmark.Example';
import { StackedBarChartCustomAccessibilityExample } from './StackedBarChart.CustomAccessibility.Example';
import { StackedBarChartDynamicExample } from './StackedBarChart.Dynamic.Example';
import { StackedBarChartMultipleExample } from './StackedBarChart.Multiple.Example';

export const MultiStackedBarChartCustomAccessibility = () => <MultiStackedBarChartCustomAccessibilityExample />;

export const MultiStackedBarChart = () => <MultiStackedBarChartExample />;

export const MultiStackedBarChartWithPlaceholder = () => <MultiStackedBarChartWithPlaceholderExample />;

export const BaseBar = () => <StackedBarChartBaseBarExample />;

export const Basic = () => <StackedBarChartBasicExample />;

export const Benchmark = () => <StackedBarChartBenchmarkExample />;

export const CustomAccessibility = () => <StackedBarChartCustomAccessibilityExample />;

export const Dynamic = () => <StackedBarChartDynamicExample />;

export const Multiple = () => <StackedBarChartMultipleExample />;

export default {
  title: 'Components/StackedBarChart',
};
