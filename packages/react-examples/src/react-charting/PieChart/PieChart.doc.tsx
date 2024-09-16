import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { PieChartBasicExample } from './PieChart.Basic.Example';
import { PieChartDynamicExample } from './PieChart.Dynamic.Example';

const PieChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/PieChart/PieChart.Basic.Example.tsx') as string;
const PieChartDynamicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/PieChart/PieChart.Dynamic.Example.tsx') as string;

export const PieChartPageProps: IDocPageProps = {
  title: 'PieChart',
  componentName: 'PieChart',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-charting/src/components/PieChart',
  examples: [
    {
      title: 'PieChart basic',
      code: PieChartBasicExampleCode,
      view: <PieChartBasicExample />,
    },
    {
      title: 'PieChart dynamic',
      code: PieChartDynamicExampleCode,
      view: <PieChartDynamicExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/PieChart/docs/PieChartOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/PieChart/docs/PieChartBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
