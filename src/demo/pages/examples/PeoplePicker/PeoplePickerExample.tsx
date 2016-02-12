import * as React from 'react';
import PeoplePicker from '../../../../components/PeoplePicker';

export default class PeoplePickerExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='PeoplePickerExample'>
        <h1>PeoplePicker</h1>
        <PeoplePicker />
      </div>
    );
  }

}
