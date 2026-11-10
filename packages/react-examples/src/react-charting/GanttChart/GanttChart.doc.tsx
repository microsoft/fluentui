import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { GanttChartBasicExample } from './GanttChart.Basic.Example';
import { GanttChartGroupedExample } from './GanttChart.Grouped.Example';

const GanttChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GanttChart/GanttChart.Basic.Example.tsx') as string;
const GanttChartGroupedExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GanttChart/GanttChart.Grouped.Example.tsx') as string;

export const GanttChartPageProps: IDocPageProps = {
  title: 'GanttChart',
  componentName: 'GanttChart',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/charts/react-charting/src/components/GanttChart',
  examples: [
    {
      title: 'GanttChart basic',
      code: GanttChartBasicExampleCode,
      view: <GanttChartBasicExample />,
    },
    {
      title: 'GanttChart grouped',
      code: GanttChartGroupedExampleCode,
      view: <GanttChartGroupedExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GanttChart/docs/GanttChartOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GanttChart/docs/GanttChartBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GanttChart/docs/GanttChartDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GanttChart/docs/GanttChartDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
