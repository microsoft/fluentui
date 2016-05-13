import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import DatePickerBasicExample from './examples/DatePicker.Basic.Example';
let DatePickerBasicExampleCode = require('./examples/DatePicker.Basic.Example.tsx');

export default class DatePickerExample extends React.Component<any, any> {
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
        <PropertiesTableSet componentName='DatePicker' />
      </div>
    );
  }

}
