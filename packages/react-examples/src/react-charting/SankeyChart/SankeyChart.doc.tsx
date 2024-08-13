import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { SankeyChartBasicExample } from './SankeyChart.Basic.Example';
import { SankeyChartInboxExample } from './SankeyChart.Inbox.Example';

const SankeyChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SankeyChart/SankeyChart.Basic.Example.tsx') as string;
const SankeyChartInboxExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SankeyChart/SankeyChart.Inbox.Example.tsx') as string;

export const SankeyChartPageProps: IDocPageProps = {
  title: 'SankeyChart',
  componentName: 'SankeyChart',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-charting/src/components/SankeyChart',
  examples: [
    {
      title: 'SankeyChart basic',
      code: SankeyChartBasicExampleCode,
      view: <SankeyChartBasicExample />,
    },
    {
      title: 'SankeyChart inbox',
      code: SankeyChartInboxExampleCode,
      view: <SankeyChartInboxExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SankeyChart/docs/SankeyChartOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SankeyChart/docs/SankeyChartBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SankeyChart/docs/SankeyChartDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SankeyChart/docs/SankeyChartDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
