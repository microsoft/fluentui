import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { ScatterChartBasicExample } from './ScatterChart.Basic.Example';
import { ScatterChartDateExample } from './ScatterChart.DateAxis.Example';
import { ScatterChartStringExample } from './ScatterChart.StringAxis.Example';
import { ScatterChartLogAxisExample } from './ScatterChart.LogAxis.Example';

const ScatterChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/ScatterChart/ScatterChart.Basic.Example.tsx') as string;
const ScatterChartDateExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/ScatterChart/ScatterChart.DateAxis.Example.tsx') as string;
const ScatterChartStringExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/ScatterChart/ScatterChart.StringAxis.Example.tsx') as string;
const ScatterChartLogAxisExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/ScatterChart/ScatterChart.LogAxis.Example.tsx') as string;

export const ScatterChartPageProps: IDocPageProps = {
  title: 'ScatterChart',
  componentName: 'ScatterChart',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/charts/react-charting/src/components/ScatterChart',
  examples: [
    {
      title: 'ScatterChart basic',
      code: ScatterChartBasicExampleCode,
      view: <ScatterChartBasicExample />,
    },
    {
      title: 'ScatterChart date',
      code: ScatterChartDateExampleCode,
      view: <ScatterChartDateExample />,
    },
    {
      title: 'ScatterChart string',
      code: ScatterChartStringExampleCode,
      view: <ScatterChartStringExample />,
    },
    {
      title: 'ScatterChart log axis',
      code: ScatterChartLogAxisExampleCode,
      view: <ScatterChartLogAxisExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/ScatterChart/docs/ScatterChartOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/ScatterChart/docs/ScatterChartBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/ScatterChart/docs/ScatterChartDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/ScatterChart/docs/ScatterChartDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
