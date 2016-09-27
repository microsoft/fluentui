import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { ChoiceGroupBasicExample } from './examples/ChoiceGroup.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const ChoiceGroupBasicExampleCode = require('./examples/ChoiceGroup.Basic.Example.tsx');

export class ChoiceGroupPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'ChoiceGroup');
  }

  public render() {
    return (
      <ComponentPage
        title='ChoiceGroup'
        componentName='ChoiceGroupExample'
        exampleCards={
          <ExampleCard title='ChoiceGroups' code={ ChoiceGroupBasicExampleCode }>
            <ChoiceGroupBasicExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet componentName='ChoiceGroup' />
        }
        overview={
          <div>
            <p>
              The ChoiceGroup component, also known as radio buttons, let users select one option from two or more choices. Each option is represented by one ChoiceGroup button; a user can select only one ChoiceGroup in a button group.
            </p>

            <p>
              ChoiceGroup emphasize all options equally, and that may draw more attention to the options than necessary. Consider using other controls, unless the options deserve extra attention from the user. For example, if the default option is recommended for most users in most situations, use a Dropdown component instead.
            </p>

            <p>
              If there are only two mutually exclusive options, combine them into a single Checkbox or Toggle switch. For example, use a Checkbox for "I agree" instead of ChoiceGroup buttons for "I agree" and "I don't agree."
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use when there are 2-7 options, if you have enough screen space and the options are important enough to be a good use of that screen space. Otherwise, use a Checkbox or Dropdown list. </li>
              <li>Use on wizard pages to make the alternatives clear, even if a Checkbox is otherwise acceptable.</li>
              <li>List the options in a logical order, such as most likely to be selected to least, simplest operation to most complex, or least risk to most. Alphabetical ordering is not recommended because it is language dependent and therefore not localizable.</li>
              <li>If none of the options is a valid choice, add another option to reflect this choice, such as "None" or "Does not apply".</li>
              <li>Select the safest (to prevent loss of data or system access) and most secure and private option as the default. If safety and security aren't factors, select the most likely or convenient option.</li>
              <li>Align radio buttons vertically instead of horizontally, if possible. Horizontal alignment is harder to read and localize.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use when the options are numbers that have fixed steps, like 10, 20, 30. Use a Slider component instead.</li>
              <li>Use if there are more than 7 options, use a Dropdown instead.</li>
              <li>Nest with other ChoiceGroup or CheckBoxes. If possible, keep all the options at the same level.</li>
            </ul>
          </div>
        }
        related={
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/ChoiceFieldGroup.md'>Fabric JS</a>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
