import * as React from 'react';

import { HorizontalBarChartBasicExample } from './HorizontalBarChart.Basic.Example';
import { HorizontalBarChartBenchmarkExample } from './HorizontalBarChart.Benchmark.Example';
import { HorizontalBarChartCustomAccessibilityExample } from './HorizontalBarChart.CustomAccessibility.Example';
import { HorizontalBarChartCustomCalloutExample } from './HorizontalBarChart.CustomCallout.Example';
import { HorizontalBarChartVariantExample } from './HorizontalBarChart.Variant.Example';

export const Basic = () => <HorizontalBarChartBasicExample />;

export const Benchmark = () => <HorizontalBarChartBenchmarkExample />;

export const CustomAccessibility = () => <HorizontalBarChartCustomAccessibilityExample />;

export const CustomCallout = () => <HorizontalBarChartCustomCalloutExample />;

export const Variant = () => <HorizontalBarChartVariantExample />;

export default {
  title: 'Components/HorizontalBarChart',
};
