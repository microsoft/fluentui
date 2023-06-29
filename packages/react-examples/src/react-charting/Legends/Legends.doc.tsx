import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { LegendBasicExample } from './Legends.Basic.Example';
const LegendsBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/Legends.Basic.Example.tsx') as string;

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
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/docs/LegendsOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/docs/LegendsBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
