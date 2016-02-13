import * as React from 'react';
import DatePicker from '../../../../components/DatePicker';
import Link from '../../../../components/Link';
import ExampleCard from '../../../components/ExampleCard';
import PropertiesTable from '../../../components/PropertiesTable';

export default class DatePickerExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='DatePickerExample'>
        <h1 className='ms-font-xxl'>DatePicker</h1>
        <div><Link text='DatePickers' url='http://dev.office.com/fabric/components/datepicker' /> provide a menu for use in context menus and dropdowns.</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='DatePicker'>
          <DatePicker />
        </ExampleCard>

      </div>

    );
  }

}
