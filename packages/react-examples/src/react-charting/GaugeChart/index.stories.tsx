import * as React from 'react';

import { GaugeChartBasicExample } from './GaugeChart.Basic.Example';
import { GaugeChartSingleSegmentExample } from './GaugeChart.SingleSegment.Example';

export const Basic = () => <GaugeChartBasicExample />;

export const SingleSegment = () => <GaugeChartSingleSegmentExample />;

export default {
  title: 'Components/GaugeChart',
};
