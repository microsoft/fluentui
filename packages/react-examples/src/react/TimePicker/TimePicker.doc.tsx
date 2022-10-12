import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { TimePickerBasicExample } from './TimePicker.Example';
const TimePickerExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/TimePicker/TimePicker.Example.tsx') as string;

export const TimePickerPageProps: IDocPageProps = {
  title: 'TimePicker',
  componentName: 'TimePicker',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/TimePicker',
  examples: [
    {
      title: 'TimePicker basic',
      code: TimePickerExampleCode,
      view: <TimePickerBasicExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/TimePicker/docs/TimePickerOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/TimePicker/docs/TimePickerBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
