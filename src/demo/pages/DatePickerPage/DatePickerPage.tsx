import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import { DatePickerBasicExample } from './examples/DatePicker.Basic.Example';
import { DatePickerRequiredExample } from './examples/DatePicker.Required.Example';
import { DatePickerInputExample } from './examples/DatePicker.Input.Example';

const DatePickerBasicExampleCode = require('./examples/DatePicker.Basic.Example.tsx');
const DatePickerRequiredExampleCode = require('./examples/DatePicker.Required.Example.tsx');
const DatePickerInputExampleCode = require('./examples/DatePicker.Input.Example.tsx');

export class DatePickerPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='DatePickerExample'>
        <h1 className='ms-font-xxl'>DatePicker</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/datepicker'>DatePickers</Link>
          <span> provide a menu for use in context menus and dropdowns.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='DatePicker' code={ DatePickerBasicExampleCode }>
          <DatePickerBasicExample />
        </ExampleCard>
        <ExampleCard title='DatePicker as required field' code={ DatePickerRequiredExampleCode }>
          <DatePickerRequiredExample />
        </ExampleCard>
        <ExampleCard title='DatePicker allows input date string' code={ DatePickerInputExampleCode }>
          <DatePickerInputExample />
        </ExampleCard>
        <PropertiesTableSet componentName='DatePicker' />
      </div>
    );
  }

}
