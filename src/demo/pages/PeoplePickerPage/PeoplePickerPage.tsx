import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { PeoplePickerBasicExample } from './examples/PeoplePicker.Basic.Example';
import { PeoplePickerDisconnectedExample } from './examples/PeoplePicker.Disconnected.Example';
import { PeoplePickerMemberListExample } from './examples/PeoplePicker.MemberList.Example';
import { PeoplePickerCompactExample } from './examples/PeoplePicker.Compact.Example';
import { PeoplePickerEditModeExample } from './/examples/PeoplePicker.EditMode.Example';

import { getPageRouteFromState } from '../../utilities/pageroute';

const PeoplePickerBasicExampleCode = require('./examples/PeoplePicker.Basic.Example.tsx');
const PeoplePickerCompactExampleCode = require('./examples/PeoplePicker.Compact.Example.tsx');
const PeoplePickerDisconnectedExampleCode = require('./examples/PeoplePicker.Disconnected.Example.tsx');
const PeoplePickerMemberListExampleCode = require('./examples/PeoplePicker.MemberList.Example.tsx');
const PeoplePickerEditModeExampleCode = require('./examples/PeoplePicker.EditMode.Example.tsx');

export class PeoplePickerPage extends React.Component<any, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState('Basic components', 'PeoplePicker');
  }

  public render() {
    return (
      <ComponentPage
        title='PeoplePicker'
        componentName='PeoplePickerExample'
        exampleCards={
          [
            <ExampleCard title='PeoplePicker' code={ PeoplePickerBasicExampleCode }>
              <PeoplePickerBasicExample />
            </ExampleCard>,
            <ExampleCard title='PeoplePicker - Compact' code={ PeoplePickerCompactExampleCode }>
              <PeoplePickerCompactExample />
            </ExampleCard>,
            <ExampleCard title='PeoplePicker - Disconnected' code={ PeoplePickerDisconnectedExampleCode }>
              <PeoplePickerDisconnectedExample />
            </ExampleCard>,
            <ExampleCard title='PeoplePicker - Member List' code={ PeoplePickerMemberListExampleCode }>
              <PeoplePickerMemberListExample />
            </ExampleCard>,
            <ExampleCard title='PeoplePicker - Edit mode' code={ PeoplePickerEditModeExampleCode }>
              <PeoplePickerEditModeExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='PeoplePicker' />
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/peoplepicker'>PeoplePickers</Link>
            <span> are used to pick recipients.</span>
          </div>
        }
        route={ this._url }>
      </ComponentPage>
    );
  }

}
