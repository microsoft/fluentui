import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTable
} from '../../components/index';
import PeoplePickerProps from './PeoplePickerProps';

import PeoplePickerBasicExample from './examples/PeoplePicker.Basic.Example';
let PeoplePickerBasicExampleCode = require('./examples/PeoplePicker.Basic.Example.tsx');

export default class PeoplePickerExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='PeoplePickerExample'>
        <h1 className='ms-font-xxl'>PeoplePicker</h1>
        <div><Link target='_blank' text='PeoplePickers' url='http://dev.office.com/fabric/components/peoplepicker' /> are used to pick recipients.</div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='PeoplePicker' code={ PeoplePickerBasicExampleCode }>
          <PeoplePickerBasicExample />
        </ExampleCard>
        <PropertiesTable properties={ PeoplePickerProps } />
      </div>
    );
  }

}
