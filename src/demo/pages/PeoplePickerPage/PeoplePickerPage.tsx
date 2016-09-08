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
// import { PeoplePickerDisconnectedExample } from './examples/PeoplePicker.Disconnected.Example';
import { PeoplePickerMemberListExample } from './examples/PeoplePicker.MemberList.Example';
import { PeoplePickerCompactExample } from './examples/PeoplePicker.Compact.Example';
// import { PeoplePickerEditModeExample } from './examples/PeoplePicker.EditMode.Example';
import { PeoplePickerCustomResultExample } from './examples/PeoplePicker.CustomResult.Example';

import { TagPickerBasicExample } from './examples/TagPicker.Basic.Example';

import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';

const PeoplePickerBasicExampleCode = require('./examples/PeoplePicker.Basic.Example.tsx');
const PeoplePickerCompactExampleCode = require('./examples/PeoplePicker.Compact.Example.tsx');
// const PeoplePickerDisconnectedExampleCode = require('./examples/PeoplePicker.Disconnected.Example.tsx');
const PeoplePickerMemberListExampleCode = require('./examples/PeoplePicker.MemberList.Example.tsx');
// const PeoplePickerEditModeExampleCode = require('./examples/PeoplePicker.EditMode.Example.tsx');
const PeoplePickerCustomResultExampleCode = require('./examples/PeoplePicker.CustomResult.Example');
export class PeoplePickerPage extends React.Component<any, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'PeoplePicker');
  }

  public render() {
    return (
      <ComponentPage
        title='PeoplePicker'
        componentName='PeoplePickerExample'
        exampleCards={
          [
            <div className='PeoplePickerExample'>
              <h1 className='ms-font-xxl'>PeoplePicker</h1>
              <div>
                <Link target='_blank' href='http://dev.office.com/fabric/components/peoplepicker'>PeoplePickers</Link>
                <span> are used to pick recipients.</span>
              </div>
              <h2 className='ms-font-xl'>Examples</h2>
              <ExampleCard title='TagPicker'>
                <TagPickerBasicExample />
              </ExampleCard>
              <ExampleCard title='Basic PeoplePicker' code={ PeoplePickerBasicExampleCode }>
                <PeoplePickerBasicExample />
              </ExampleCard>
              <ExampleCard title='MemberList PeoplePicker' code={ PeoplePickerMemberListExampleCode }>
                <PeoplePickerMemberListExample />
              </ExampleCard>
              <ExampleCard title='Compact PeoplePicker' code={ PeoplePickerCompactExampleCode }>
                <PeoplePickerCompactExample />
              </ExampleCard>
              <ExampleCard title='Custom PeoplePicker' code={ PeoplePickerCustomResultExampleCode }>
                <PeoplePickerCustomResultExample />
              </ExampleCard>
            </div>
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
