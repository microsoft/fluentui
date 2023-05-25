import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { TimePickerBasicExample } from './TimePicker.Basic.Example';
import { TimePickerControlledExample } from './TimePicker.Controlled.Example';
import { TimePickerCustomTimeStringsExample } from './TimePicker.CustomTimeStrings.Example';
import { TimePickerValidationResultExample } from './TimePicker.ValidationResult.Example';
import { TimePickerDateTimePickerExample } from './TimePicker.DateTimePicker.Example';

const TimePickerBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/TimePicker/TimePicker.Basic.Example.tsx') as string;
const TimePickerControlledExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/TimePicker/TimePicker.Controlled.Example.tsx') as string;
const TimePickerCustomTimeStringsExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/TimePicker/TimePicker.CustomTimeStrings.Example.tsx') as string;
const TimePickerValidationResultExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/TimePicker/TimePicker.ValidationResult.Example.tsx') as string;
const TimePickerDateTimePickerExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/TimePicker/TimePicker.DateTimePicker.Example.tsx') as string;

export const TimePickerPageProps: IDocPageProps = {
  title: 'TimePicker',
  componentName: 'TimePicker',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/TimePicker',
  examples: [
    {
      title: 'TimePicker basic',
      code: TimePickerBasicExampleCode,
      view: <TimePickerBasicExample />,
    },
    {
      title: 'TimePicker controlled',
      code: TimePickerControlledExampleCode,
      view: <TimePickerControlledExample />,
    },
    {
      title: 'TimePicker with custom time strings',
      code: TimePickerCustomTimeStringsExampleCode,
      view: <TimePickerCustomTimeStringsExample />,
    },
    {
      title: 'TimePicker using onValidationResult callback',
      code: TimePickerValidationResultExampleCode,
      view: <TimePickerValidationResultExample />,
    },
    {
      title: 'TimePicker with DatePicker',
      code: TimePickerDateTimePickerExampleCode,
      view: <TimePickerDateTimePickerExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/TimePicker/docs/TimePickerOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/TimePicker/docs/TimePickerBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
