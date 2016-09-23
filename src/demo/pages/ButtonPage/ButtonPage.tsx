import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { ButtonBasicExample } from './examples/Button.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const ButtonBasicExampleCode = require('./examples/Button.Basic.Example.tsx');

export class ButtonPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url =  getPageRouteFromState(AppState, 'Basic components', 'Button');
  }

  public render() {
    return (
      <ComponentPage
        title='Button'
        componentName='ButtonExample'
        exampleCards={
          [
            <ExampleCard
              title='Various button types'
              code={ ButtonBasicExampleCode }>
              <ButtonBasicExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='Button' />,
            <p>Besides the above properties, the <code>Button</code> component accepts all properties that the React <code>button</code> and <code>a</code> components accept.</p>
          ]
        }
        overview={
          <div>
            <p>Buttons are best used to enable a user to commit a change or complete steps in a task. They are typically found inside forms, dialogs, panels or pages. An example of their usage is confirming the deletion of a file in a confirmation dialog.</p>
            <p>When considering their place in a layout, contemplate the order in which a user will flow through the UI. As an example, in a form, the individual will need to read and interact with the form fields before submiting the form. Therefore, as a general rule, the button should be placed at the bottom of the UI container (a dialog, panel, or page) which holds the related UI elements.</p>
            <p>While buttons can technically be used to navigate a user to another part of the experience, this is not recommended unless that navigation is part of an action or their flow.</p>
          </div>
        }
        related={
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Button.md'>Fabric JS</a>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Make sure the label conveys a clear purpose of the button to the user.</li>
              <li>Button labels must describe the action the button will perform and should include a verb. Use concise, specific, self-explanatory labels, usually a single word.</li>
              <li>Buttons should always include a noun if there is any room for interpretation about what the verb operates on.</li>
              <li>Consider the affect localization will have on the button and what will happen to components around it.</li>
              <li>If the button’s label content is dynamic, consider how the button will resize and what will happen to components around it.</li>
              <li>Use only a single line of text in the label of the button.</li>
              <li>Expose only one or two buttons to the user at a time, for example, "Accept" and "Cancel". If you need to expose more actions to the user, consider using checkboxes or radio buttons from which the user can select actions, with a single command button to trigger those actions.</li>
              <li>Show only one primary button that inherits theme color at rest state. In the event there are more than two buttons with equal priority, all buttons should have neutral backgrounds.</li>
              <li>"Submit", "OK", and "Apply" buttons should always be styled as primary buttons. When "Reset" or "Cancel" buttons appear alongside one of the above, they should be styled as secondary buttons.</li>
              <li>Default buttons should always perform safe operations. For example, a default button should never delete.</li>
              <li>Use task buttons to cause actions that complete a task or cause a transitional task. Do not use buttons to toggle other UX in the same context. For example, a button may be used to open an interface area but should not be used to open an additional set of components in the same interface.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don't use generic labels like "Ok," especially in the case of an error; errors are never "Ok."</li>
              <li>Don’t place the default focus on a button that destroys data. Instead, place the default focus on the button that performs the "safe act" and retains the content (i.e. "Save") or cancels the action (i.e. "Cancel").</li>
              <li>Don’t use a button to navigate to another place, use a link instead. The exception is in a wizard where "Back" and "Next" buttons may be used.</li>
              <li>Don’t put too much text in a button - try to keep the length of your text to a minimum.</li>
              <li>Don't put anything other than text in a button.</li>
            </ul>
          </div>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}
