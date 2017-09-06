import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ChoiceGroupBasicExample } from './examples/ChoiceGroup.Basic.Example';
import { ChoiceGroupCustomExample } from './examples/ChoiceGroup.Custom.Example';
import { ChoiceGroupImageExample } from './examples/ChoiceGroup.Image.Example';
import { ChoiceGroupIconExample } from './examples/ChoiceGroup.Icon.Example';

const ChoiceGroupBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Basic.Example.tsx') as string;
const ChoiceGroupCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Custom.Example.tsx') as string;
const ChoiceGroupImageExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Image.Example.tsx') as string;
const ChoiceGroupIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Icon.Example.tsx') as string;

export class ChoiceGroupPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='ChoiceGroup'
        componentName='ChoiceGroupExample'
        exampleCards={
          <div>
            <ExampleCard title='ChoiceGroups' code={ ChoiceGroupBasicExampleCode }>
              <ChoiceGroupBasicExample />
            </ExampleCard>
            <ExampleCard title='ChoiceGroups' code={ ChoiceGroupCustomExampleCode }>
              <ChoiceGroupCustomExample />
            </ExampleCard>
            <ExampleCard title='ChoiceGroups using Images' code={ ChoiceGroupImageExampleCode }>
              <ChoiceGroupImageExample />
            </ExampleCard>
            <ExampleCard title='ChoiceGroups using Icons' code={ ChoiceGroupIconExampleCode }>
              <ChoiceGroupIconExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/ChoiceGroup.Props.ts')
            ] }
          />
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
          <a href='https://dev.office.com/fabric-js/Components/ChoiceFieldGroup/ChoiceFieldGroup.html'>Fabric JS</a>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      >
      </ComponentPage>
    );
  }
}
