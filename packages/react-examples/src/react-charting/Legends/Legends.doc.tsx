import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { LegendOverflowExample } from './Legends.Overflow.Example';
import { LegendBasicExample } from './Legends.Basic.Example';
import { LegendWrapLinesExample } from './Legends.WrapLines.Example';
import { LegendStyledExample } from './Legends.Styled.Example';

const LegendsOverflowExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/Legends.Overflow.Example.tsx') as string;
const LegendsWrapLinesExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/Legends.WrapLines.Example.tsx') as string;
const LegendsBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/Legends.Basic.Example.tsx') as string;
const LegendsStyledExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/Legends.Styled.Example.tsx') as string;

export const LegendsPageProps: IDocPageProps = {
  title: 'Legends',
  componentName: 'Legends',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-charting/src/components/Legends',
  examples: [
    {
      title: 'Legends basic',
      code: LegendsBasicExampleCode,
      view: <LegendBasicExample />,
    },
    {
      title: 'Legends with overflow',
      code: LegendsOverflowExampleCode,
      view: <LegendOverflowExample />,
    },
    {
      title: 'Legends with wrap lines',
      code: LegendsWrapLinesExampleCode,
      view: <LegendWrapLinesExample />,
    },
    {
      title: 'Legend styled',
      code: LegendsStyledExampleCode,
      view: <LegendStyledExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/docs/LegendsOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/docs/LegendsBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
