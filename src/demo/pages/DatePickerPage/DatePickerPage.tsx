import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTable
} from '../../components/index';
import DatePickerProps from './DatePickerProps';

import DatePickerBasicExample from './examples/DatePicker.Basic.Example';
let DatePickerBasicExampleCode = require('./examples/DatePicker.Basic.Example.tsx');

export default class DatePickerExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='DatePickerExample'>
        <h1 className='ms-font-xxl'>DatePicker</h1>
        <div><Link target='_blank' text='DatePickers' url='http://dev.office.com/fabric/components/datepicker' /> provide a menu for use in context menus and dropdowns.</div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='DatePicker' code={ DatePickerBasicExampleCode }>
          <DatePickerBasicExample />
        </ExampleCard>
        <PropertiesTable properties={ DatePickerProps } />
      </div>
    );
  }

}
