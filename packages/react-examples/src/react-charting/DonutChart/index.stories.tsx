import * as React from 'react';

import { DonutChartBasicExample } from './DonutChart.Basic.Example';
import { DonutChartCustomAccessibilityExample } from './DonutChart.CustomAccessibility.Example';
import { DonutChartCustomCalloutExample } from './DonutChart.CustomCallout.Example';
import { DonutChartDynamicExample } from './DonutChart.Dynamic.Example';

export const Basic = () => <DonutChartBasicExample />;

export const CustomAccessibility = () => <DonutChartCustomAccessibilityExample />;

export const CustomCallout = () => <DonutChartCustomCalloutExample />;

export const Dynamic = () => <DonutChartDynamicExample />;

export default {
  title: 'Components/DonutChart',
};
