import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import './PeoplePickerPage.scss';

import { PeoplePickerBasicExample } from './examples/PeoplePicker.Basic.Example';
import { PeoplePickerDisconnectedExample } from './examples/PeoplePicker.Disconnected.Example';
import { PeoplePickerMemberListExample } from './examples/PeoplePicker.MemberList.Example';
import { PeoplePickerCompactExample } from './examples/PeoplePicker.Compact.Example';
import { PeoplePickerEditModeExample } from './/examples/PeoplePicker.EditMode.Example';

import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const PeoplePickerBasicExampleCode = require('./examples/PeoplePicker.Basic.Example.tsx');
const PeoplePickerCompactExampleCode = require('./examples/PeoplePicker.Compact.Example.tsx');
const PeoplePickerDisconnectedExampleCode = require('./examples/PeoplePicker.Disconnected.Example.tsx');
const PeoplePickerMemberListExampleCode = require('./examples/PeoplePicker.MemberList.Example.tsx');
const PeoplePickerEditModeExampleCode = require('./examples/PeoplePicker.EditMode.Example.tsx');

export class PeoplePickerPage extends React.Component<IComponentDemoPageProps, any> {
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
        className='PeoplePickerPage'
        exampleCards={
          [
            <ExampleCard title='PeoplePicker' code={ PeoplePickerBasicExampleCode }>
              <p>
                The default version of the PeoplePicker. Includes a specialized TextField well, which selected entities are added to.
              </p>
              <PeoplePickerBasicExample />
            </ExampleCard>,
            <ExampleCard title='PeoplePicker - Compact' code={ PeoplePickerCompactExampleCode }>
              <p>
                The compact variant makes various UI elements smaller, such as the list of results and search button. It should be used in information-dense scenarios that require more compact UI.
              </p>
              <PeoplePickerCompactExample />
            </ExampleCard>,
            <ExampleCard title='PeoplePicker - Disconnected' code={ PeoplePickerDisconnectedExampleCode }>
              <p>
                The disconnected state includes additional styling and text to let the user know there are issues when performing a search for entities. It should be used if there are connection issues that would prevent a user's search from running.
              </p>
              <PeoplePickerDisconnectedExample />
            </ExampleCard>,
            <ExampleCard title='PeoplePicker - Member List' code={ PeoplePickerMemberListExampleCode }>
              <p>
                The Facepile variant adds selected entities to a vertical list below the PeoplePicker's input field instead of directly in the well. It should be used when additional details about the entities may be useful to surface directly, or when the list of entities is meant to be the focus of an experience (such as in a Panel).
              </p>
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
            <p>
              The PeoplePicker is used to select one or more entities, such as people or groups. Entry points for PeoplePickers are typically specialized TextField-like input fields known as a "well", which are used to search for recipients from a list. When a recipient is selected from the list, it is added to the well as a specialized Persona that can be interacted with or removed.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>
                Use to select people to add to a list.
              </li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>
                Don’t use to select objects that are not people or groups.
              </li>
            </ul>
          </div>
        }
        related={
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/PeoplePicker.md'>Fabric JS</a>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}
