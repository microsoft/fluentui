import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { DeclarativeChartBasicExample } from './DeclarativeChart.Basic.Example';

const DeclarativeChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DeclarativeChart/DeclarativeChart.Basic.Example.tsx') as string;

export const DeclarativeChartPageProps: IDocPageProps = {
  title: 'DeclarativeChart',
  componentName: 'DeclarativeChart',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/charts/react-charting/src/components/DeclarativeChart',
  examples: [
    {
      title: 'DeclarativeChart basic',
      code: DeclarativeChartBasicExampleCode,
      view: <DeclarativeChartBasicExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DeclarativeChart/docs/DeclarativeChartOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DeclarativeChart/docs/DeclarativeChartBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DeclarativeChart/docs/DeclarativeChartDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/DeclarativeChart/docs/DeclarativeChartDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
