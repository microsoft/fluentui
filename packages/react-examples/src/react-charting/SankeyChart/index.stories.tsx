import * as React from 'react';

import { SankeyChartBasicExample } from './SankeyChart.Basic.Example';
import { SankeyChartInboxExample } from './SankeyChart.Inbox.Example';
import { SankeyChartRebalanceExample } from './SankeyChart.Rebalance.Example';

export const Basic = () => <SankeyChartBasicExample />;

export const Inbox = () => <SankeyChartInboxExample />;

export const Rebalance = () => <SankeyChartRebalanceExample />;

export default {
  title: 'Components/SankeyChart',
};
