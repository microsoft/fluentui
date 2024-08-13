import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { SparklineChartBasicExample } from './SparklineChart.Basic.Example';

const SparklineChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SparklineChart/SparklineChart.Basic.Example.tsx') as string;

export const SparklineChartPageProps: IDocPageProps = {
  title: 'SparklineChart',
  componentName: 'SparklineChart',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/react-charting/src/components/SparklineChart',
  examples: [
    {
      title: 'SparklineChart basic',
      code: SparklineChartBasicExampleCode,
      view: <SparklineChartBasicExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SparklineChart/docs/SparklineChartOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SparklineChart/docs/SparklineChartBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SparklineChart/docs/SparklineChartDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/SparklineChart/docs/SparklineChartDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
