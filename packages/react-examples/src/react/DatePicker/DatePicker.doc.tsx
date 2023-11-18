import * as React from 'react';
import { DatePickerBasicExample } from './DatePicker.Basic.Example';
import { DatePickerDisabledExample } from './DatePicker.Disabled.Example';
import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';
import { DatePickerWeekNumbersExample } from './DatePicker.WeekNumbers.Example';
import { DatePickerRequiredExample } from './DatePicker.Required.Example';
import { DatePickerInputExample } from './DatePicker.Input.Example';
import { DatePickerFormatExample } from './DatePicker.Format.Example';
import { DatePickerBoundedExample } from './DatePicker.Bounded.Example';
import { DatePickerExternalControlsExample } from './DatePicker.ExternalControls.Example';

const DatePickerBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DatePicker/DatePicker.Basic.Example.tsx') as string;
const DatePickerDisabledExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DatePicker/DatePicker.Disabled.Example.tsx') as string;
const DatePickerWeekNumbersExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DatePicker/DatePicker.WeekNumbers.Example.tsx') as string;
const DatePickerRequiredExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DatePicker/DatePicker.Required.Example.tsx') as string;
const DatePickerInputExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DatePicker/DatePicker.Input.Example.tsx') as string;
const DatePickerFormatExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DatePicker/DatePicker.Format.Example.tsx') as string;
const DatePickerBoundedExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DatePicker/DatePicker.Bounded.Example.tsx') as string;
const DatePickerExternalControlsExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DatePicker/DatePicker.ExternalControls.Example.tsx') as string;

export const DatePickerPageProps: IDocPageProps = {
  title: 'DatePicker',
  componentName: 'DatePicker',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/DatePicker',
  examples: [
    {
      title: 'Default DatePicker',
      code: DatePickerBasicExampleCode,
      view: <DatePickerBasicExample />,
    },
    {
      title: 'Disabled DatePicker',
      code: DatePickerDisabledExampleCode,
      view: <DatePickerDisabledExample />,
    },
    {
      title: 'DatePicker with week numbers',
      code: DatePickerWeekNumbersExampleCode,
      view: <DatePickerWeekNumbersExample />,
    },
    {
      title: 'DatePicker with required field',
      code: DatePickerRequiredExampleCode,
      view: <DatePickerRequiredExample />,
    },
    {
      title: 'DatePicker allowing text input',
      code: DatePickerInputExampleCode,
      view: <DatePickerInputExample />,
    },
    {
      title: 'DatePicker with custom date formatting',
      code: DatePickerFormatExampleCode,
      view: <DatePickerFormatExample />,
    },
    {
      title: 'DatePicker with date boundaries',
      code: DatePickerBoundedExampleCode,
      view: <DatePickerBoundedExample />,
    },
    {
      title: 'DatePicker with external controls',
      code: DatePickerExternalControlsExampleCode,
      view: <DatePickerExternalControlsExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DatePicker/docs/DatePickerOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DatePicker/docs/DatePickerBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
