import * as React from 'react';
import { DatePickerBasicExample } from './examples/DatePicker.Basic.Example';
import { DatePickerDisabledExample } from './examples/DatePicker.Disabled.Example';
import { IDocPageProps } from '../../common/DocPage.types';
import { DatePickerWeekNumbersExample } from './examples/DatePicker.WeekNumbers.Example';
import { DatePickerRequiredExample } from './examples/DatePicker.Required.Example';
import { DatePickerInputExample } from './examples/DatePicker.Input.Example';
import { DatePickerFormatExample } from './examples/DatePicker.Format.Example';
import { DatePickerBoundedExample } from './examples/DatePicker.Bounded.Example';

import { DatePickerStatus } from './DatePicker.checklist';

const DatePickerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DatePicker/examples/DatePicker.Basic.Example.tsx') as string;
const DatePickerDisabledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DatePicker/examples/DatePicker.Disabled.Example.tsx') as string;
const DatePickerBasicExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/DatePicker/DatePicker.Basic.Example.Codepen.txt') as string;
const DatePickerWeekNumbersExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DatePicker/examples/DatePicker.WeekNumbers.Example.tsx') as string;
const DatePickerRequiredExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DatePicker/examples/DatePicker.Required.Example.tsx') as string;
const DatePickerInputExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DatePicker/examples/DatePicker.Input.Example.tsx') as string;
const DatePickerFormatExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DatePicker/examples/DatePicker.Format.Example.tsx') as string;
const DatePickerBoundedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DatePicker/examples/DatePicker.Bounded.Example.tsx') as string;

export const DatePickerPageProps: IDocPageProps = {
  title: 'DatePicker',
  componentName: 'DatePicker',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/DatePicker',
  componentStatus: DatePickerStatus,
  examples: [
    {
      title: 'Default DatePicker',
      code: DatePickerBasicExampleCode,
      view: <DatePickerBasicExample />,
      codepenJS: DatePickerBasicExampleCodepen
    },
    {
      title: 'Disabled DatePicker',
      code: DatePickerDisabledExampleCode,
      view: <DatePickerDisabledExample />
    },
    {
      title: 'DatePicker with week numbers',
      code: DatePickerWeekNumbersExampleCode,
      view: <DatePickerWeekNumbersExample />
    },
    {
      title: 'DatePicker with required field',
      code: DatePickerRequiredExampleCode,
      view: <DatePickerRequiredExample />
    },
    {
      title: 'DatePicker allows input date string',
      code: DatePickerInputExampleCode,
      view: <DatePickerInputExample />
    },
    {
      title: 'DatePicker allows dates to be formatted',
      code: DatePickerFormatExampleCode,
      view: <DatePickerFormatExample />
    },
    {
      title: 'DatePicker with date boundary (minDate, maxDate)',
      code: DatePickerBoundedExampleCode,
      view: <DatePickerBoundedExample />
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/DatePicker/DatePicker.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/DatePicker/docs/DatePickerOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/DatePicker/docs/DatePickerDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/DatePicker/docs/DatePickerDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
