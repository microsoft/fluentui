import * as React from 'react';

import { SankeyChartBasicExample } from './SankeyChart.Basic.Example';
import { SankeyChartInboxExample } from './SankeyChart.Inbox.Example';
import { SankeyChartRebalanceExample } from './SankeyChart.Rebalance.Example';
import { SankeyChartResponsiveExample } from './SankeyChart.Responsive.Example';

export const Basic = () => <SankeyChartBasicExample />;

export const Inbox = () => <SankeyChartInboxExample />;

export const Rebalance = () => <SankeyChartRebalanceExample />;

export const Responsive = () => <SankeyChartResponsiveExample />;

export default {
  title: 'Components/SankeyChart',
};
