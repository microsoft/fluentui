import * as React from 'react';
import DatePicker from '../../../components/datePicker/DatePicker';

export default class DatePickerExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='DatePickerExample'>
        <h1>DatePicker</h1>
        <DatePicker />
      </div>
    );
  }

}
