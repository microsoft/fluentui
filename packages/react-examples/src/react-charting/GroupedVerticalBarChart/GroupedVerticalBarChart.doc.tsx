import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { GroupedVerticalBarChartBasicExample } from './GroupedVerticalBarChart.Basic.Example';
import { GroupedVerticalBarChartTruncatedExample } from './GroupedVerticalBarChart.Truncated.Example';
import { GroupedVerticalBarChartStyledExample } from './GroupedVerticalBarChart.Styled.Example';
import { GroupedVerticalBarChartCustomAccessibilityExample } from './GroupedVerticalBarChart.CustomAccessibility.Example';
import { GroupedVerticalBarChartSecondaryYAxisExample } from './GroupedVerticalBarChart.SecondaryYAxis.Example';
import { GroupedVerticalBarChartNegativeExample } from './GroupedVerticalBarChart.Negative.Example';
import { GroupedVerticalBarChartLineExample } from './GroupedVerticalBarChart.Line.Example';

const GroupedVerticalBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GroupedVerticalBarChart/GroupedVerticalBarChart.Basic.Example.tsx') as string;
const GroupedVerticalStyledExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GroupedVerticalBarChart/GroupedVerticalBarChart.Styled.Example.tsx') as string;
const GroupedVerticalTruncatedExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GroupedVerticalBarChart/GroupedVerticalBarChart.Truncated.Example.tsx') as string;
const GroupedVerticalCustomAccessibilityExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GroupedVerticalBarChart/GroupedVerticalBarChart.CustomAccessibility.Example.tsx') as string;
const GroupedVerticalBarChartSecondaryYAxisExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GroupedVerticalBarChart/GroupedVerticalBarChart.SecondaryYAxis.Example.tsx') as string;
const GroupedVerticalBarChartNegativeExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GroupedVerticalBarChart/GroupedVerticalBarChart.Negative.Example.tsx') as string;
const GroupedVerticalBarChartLineExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GroupedVerticalBarChart/GroupedVerticalBarChart.Line.Example.tsx') as string;

export const GroupedVerticalBarChartPageProps: IDocPageProps = {
  title: 'GroupedVerticalBarChart',
  componentName: 'GroupedVerticalBarChart',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/charts/react-charting/src/components/GroupedVerticalBarChart',
  examples: [
    {
      title: 'GroupedVerticalBarChart basic',
      code: GroupedVerticalBasicExampleCode,
      view: <GroupedVerticalBarChartBasicExample />,
    },
    {
      title: 'GroupedVerticalBarChart styled',
      code: GroupedVerticalStyledExampleCode,
      view: <GroupedVerticalBarChartStyledExample />,
    },
    {
      title: 'GroupedVerticalBarChart truncated',
      code: GroupedVerticalTruncatedExampleCode,
      view: <GroupedVerticalBarChartTruncatedExample />,
    },
    {
      title: 'GroupedVerticalBarChart custom accessibility',
      code: GroupedVerticalCustomAccessibilityExampleCode,
      view: <GroupedVerticalBarChartCustomAccessibilityExample />,
    },
    {
      title: 'GroupedVerticalBarChart secondary y-axis',
      code: GroupedVerticalBarChartSecondaryYAxisExampleCode,
      view: <GroupedVerticalBarChartSecondaryYAxisExample />,
    },
    {
      title: 'GroupedVerticalBarChart negative y-axis',
      code: GroupedVerticalBarChartNegativeExampleCode,
      view: <GroupedVerticalBarChartNegativeExample />,
    },
    {
      title: 'GroupedVerticalBarChart with lines',
      code: GroupedVerticalBarChartLineExampleCode,
      view: <GroupedVerticalBarChartLineExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GroupedVerticalBarChart/docs/GroupedVerticalBarChartOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GroupedVerticalBarChart/docs/GroupedVerticalBarChartBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GroupedVerticalBarChart/docs/GroupedVerticalBarChartDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/GroupedVerticalBarChart/docs/GroupedVerticalBarChartDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
