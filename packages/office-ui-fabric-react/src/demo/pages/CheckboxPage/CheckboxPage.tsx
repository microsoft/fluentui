import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { CheckboxBasicExample } from './examples/Checkbox.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const CheckboxBasicExampleCode = require('./examples/Checkbox.Basic.Example.tsx');

export class CheckboxPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Checkbox');
  }

  public render() {
    return (
      <ComponentPage
        title='Checkbox'
        componentName='CheckboxExample'
        exampleCards={
          <ExampleCard title='Checkboxes' code={ CheckboxBasicExampleCode }>
            <CheckboxBasicExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet componentName='Checkbox' />
        }
        overview={
          <div>
            <p>
              A Checkbox is a UI element that allows users to switch between two mutually exclusive options (checked or unchecked, on or off) through a single click or tap. It can also be used to indicate a subordinate setting or preference when paired with another control.
            </p>

            <p>
              A Checkbox is used to select or deselect action items. It can be used for a single item or for a list of multiple items that a user can choose from. The control has two selection states: unselected and selected.
            </p>

            <p>
              Use a single Checkbox for a subordinate setting, such as with a "Remember me?" login scenario or with a terms of service agreement.
            </p>

            <p>
              For a binary choice, the main difference between a Checkbox and a toggle switch is that the Checkbox is for status and the toggle switch is for action. You can delay committing a Checkbox interaction (as part of a form submit, for example), while you should immediately commit a toggle switch interaction. Also, only Checkboxes allow for multi-selection.
            </p>

            <p>
              Use multiple Checkboxes for multi-select scenarios in which a user chooses one or more items from a group of choices that are not mutually exclusive.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Allow users to choose any combination of options when several Checkboxes are grouped together.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don't use a Checkbox as an on/off control. Instead use a toggle switch.</li>
              <li>Don’t use a Checkbox when the user can choose only one option from the group, use radio buttons instead.</li>
              <li>Don't put two groups of Checkboxes next to each other. Separate the two groups with labels.</li>
            </ul>
          </div>
        }
        related={
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Checkbox.md'>Fabric JS</a>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
