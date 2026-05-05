import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { PolarChartBasicExample } from './PolarChart.Basic.Example';

const PolarChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/PolarChart/PolarChart.Basic.Example.tsx') as string;

export const PolarChartPageProps: IDocPageProps = {
  title: 'PolarChart',
  componentName: 'PolarChart',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/charts/react-charting/src/components/PolarChart',
  examples: [
    {
      title: 'PolarChart basic',
      code: PolarChartBasicExampleCode,
      view: <PolarChartBasicExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/PolarChart/docs/PolarChartOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/PolarChart/docs/PolarChartBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/PolarChart/docs/PolarChartDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/PolarChart/docs/PolarChartDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
