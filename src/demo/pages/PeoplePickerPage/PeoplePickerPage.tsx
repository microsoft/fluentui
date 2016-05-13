import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import PeoplePickerBasicExample from './examples/PeoplePicker.Basic.Example';
let PeoplePickerBasicExampleCode = require('./examples/PeoplePicker.Basic.Example.tsx');

import PeoplePickerCompactExample from './examples/PeoplePicker.Compact.Example';
let PeoplePickerCompactExampleCode = require('./examples/PeoplePicker.Compact.Example.tsx');

import PeoplePickerDisconnectedExample from './examples/PeoplePicker.Disconnected.Example';
let PeoplePickerDisconnectedExampleCode = require('./examples/PeoplePicker.Disconnected.Example.tsx');

import PeoplePickerMemberListExample from './examples/PeoplePicker.MemberList.Example';
let PeoplePickerMemberListExampleCode = require('./examples/PeoplePicker.MemberList.Example.tsx');

export default class PeoplePickerExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='PeoplePickerExample'>
        <h1 className='ms-font-xxl'>PeoplePicker</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/peoplepicker'>PeoplePickers</Link>
          <span> are used to pick recipients.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='PeoplePicker' code={ PeoplePickerBasicExampleCode }>
          <PeoplePickerBasicExample />
        </ExampleCard>
        <ExampleCard title='PeoplePicker - Compact' code={ PeoplePickerCompactExampleCode }>
          <PeoplePickerCompactExample />
        </ExampleCard>
        <ExampleCard title='PeoplePicker - Disconnected' code={ PeoplePickerDisconnectedExampleCode }>
          <PeoplePickerDisconnectedExample />
        </ExampleCard>
        <ExampleCard title='PeoplePicker - Member List' code={ PeoplePickerMemberListExampleCode }>
          <PeoplePickerMemberListExample />
        </ExampleCard>
        <PropertiesTableSet componentName='PeoplePicker' />
      </div>
    );
  }

}
