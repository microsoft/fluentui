import * as React from 'react';

import { GaugeChartBasicExample } from './GaugeChart.Basic.Example';
import { GaugeChartSingleSegmentExample } from './GaugeChart.SingleSegment.Example';
import { GaugeChartResponsiveExample } from './GaugeChart.Responsive.Example';

export const Basic = () => <GaugeChartBasicExample />;

export const SingleSegment = () => <GaugeChartSingleSegmentExample />;

export const Responsive = () => <GaugeChartResponsiveExample />;

export default {
  title: 'Components/GaugeChart',
};
