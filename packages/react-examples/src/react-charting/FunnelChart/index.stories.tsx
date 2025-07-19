import * as React from 'react';

import { FunnelChartBasicExample } from './FunnelChart.Basic.Example';
import { FunnelChartStackedExample } from './FunnelChart.Stacked.Example';

export const Basic = () => <FunnelChartBasicExample />;
export const Stacked = () => <FunnelChartStackedExample />;

export default {
  title: 'Components/FunnelChart',
};
