import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { FunnelChartBasicExample } from './FunnelChart.Basic.Example';
import { FunnelChartStackedExample } from './FunnelChart.Stacked.Example';

const FunnelChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/FunnelChart/FunnelChart.Basic.Example.tsx') as string;
const FunnelChartStackedExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/FunnelChart/FunnelChart.Stacked.Example.tsx') as string;

export const FunnelChartPageProps: IDocPageProps = {
  title: 'FunnelChart',
  componentName: 'FunnelChart',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/charts/react-charting/src/components/FunnelChart',
  examples: [
    {
      title: 'FunnelChart basic',
      code: FunnelChartBasicExampleCode,
      view: <FunnelChartBasicExample />,
    },
    {
      title: 'FunnelChart stacked',
      code: FunnelChartStackedExampleCode,
      view: <FunnelChartStackedExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/FunnelChart/docs/FunnelChartOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/FunnelChart/docs/FunnelChartBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/FunnelChart/docs/FunnelChartDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/FunnelChart/docs/FunnelChartDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
